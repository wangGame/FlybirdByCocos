import { Asset, Constructor, resources } from "cc"

export class ResUtils {
    private static _resUtils:ResUtils
    public static get resUtils(){
        if(!this._resUtils){
            this._resUtils = new ResUtils()
        }
        return ResUtils._resUtils
    }

    private resCache = new Map<string,Asset>()

    
    public loadResAsset<T extends Asset> (path:string,type: Constructor<T>):Promise<T>{
        return new Promise<T>((resolve,reject)=>{            
           if(this.resCache.has(path)){
                let rest = this.resCache.get(path) as T
                console.log(`资源${path}成功,存在缓存!`)
                resolve(rest)
            }else{
                const callback = (err,asset)=>{
                    if(err){
                        console.log(`资源${path}加载失败`)
                        reject(err)
                    }else{
                        console.log(`资源${path}加载成功,并写入缓存!`)
                        this.resCache.set(path,asset)
                        resolve(asset as T)
                    }
                }
                // this.loadResource(path,type,callback)
                resources.load(path, type, callback)
            }
        })
    }

    /**
     * 批量加载文件夹资源
     * @param folderPath 文件夹路径
     * @param type 资源类型，例如 SpriteFrame / Texture2D
     * @param onProgress 可选加载进度回调，返回 0~1
     * @returns Promise<{ [name: string]: T }>
     */
    public loadFolderAssets<T extends Asset>(
        folderPath: string,
        type: Constructor<T>,
        onProgress?: (progress: number) => void
    ): Promise<{ [name: string]: T }> {
        return new Promise((resolve, reject) => {
            resources.loadDir(folderPath, type,
                (completed: number, total: number, item) => {
                    if (onProgress) {
                        onProgress(completed / total)
                    }
                },
                (err, assets: T[]) => {
                    if (err) {
                        console.log(`文件夹${folderPath}加载失败`)
                        reject(err)
                        return
                    }
                    const dict: { [name: string]: T } = {}
                    assets.forEach(asset => {
                        dict[asset.name] = asset
                        const cacheKey = `${folderPath}/${asset.name}/${asset.constructor.name}`
                        this.resCache.set(cacheKey, asset)
                        console.log(cacheKey)
                        // console.log(`key:${folderPath}/${cacheKey}/${asset.constructor.name}`)
                    })
                    console.log(`文件夹${folderPath}加载成功,共 ${assets.length} 个资源`)
                    resolve(dict)
                }
            )
        })
    }

    /**
     * 
     * 
     * @param folders 文件夹目录
     * @param onProgress 进度
     * @returns 
     */
    public async loadMultiFolders<T extends Asset>(
        folders: { path: string, type: Constructor<T> }[],
        onProgress?: (progress: number) => void
    ): Promise<{ [key: string]: T }> {
        let totalAssets = 0
        let loadedAssets = 0
        const folderDicts: { [key: string]: T }[] = []

        // 第一次先获取每个文件夹资源数量
        for (let f of folders) {
            await new Promise<void>((resolve, reject) => {
                resources.loadDir(f.path, f.type,
                    (completed, total) => {
                        totalAssets += total
                    },
                    (err, assets: T[]) => {
                        if (err) reject(err)
                        else resolve()
                    }
                )
            })
        }

        // 加载每个文件夹
        for (let f of folders) {
            const dict = await this.loadFolderAssets(f.path, f.type, (progress) => {
                loadedAssets += progress
                if (onProgress) {
                    onProgress(Math.min(loadedAssets / folders.length, 1))
                }
            })
            folderDicts.push(dict)
        }

        // 合并字典
        const resDict: { [key: string]: T } = {}
        folders.forEach((f, idx) => {
            for (let key in folderDicts[idx]) {
                resDict[`${f.path}/${key}`] = folderDicts[idx][key]
            }
        })

        if (onProgress) onProgress(1)
        return resDict
    }

}


