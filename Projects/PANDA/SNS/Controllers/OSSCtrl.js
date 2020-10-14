// 引入OSS配置文件
const client = require("../Config/OSSconfig");
// 引入path模块
const path = require("path");

/**
 * 上传文件到OSS
 * @param {String} filename 文件名
 */
module.exports.uploadOSS = async function put(filename) {
    try {
        //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        let result = await client.put(`/images/${filename}`, path.join(__dirname, "../", "public", "uploads", filename));
        return result.res.requestUrls[0];
    } catch (e) {
        console.log(e);
    }
}
/**
 * 从OSS删除文件
 * @param {String} filename 
 */
module.exports.deleteOSS = async function deleteFile(filename) {
    try {
        let result = await client.delete(`/images/${filename}`)
    } catch (e) {
        console.log(e);
    }
}
/**
 * 
 * @param {String} filename 图片文件名 
 */
module.exports.existImage = async function (filename) {
    try {
        let result = await client.get(`/images/${filename}`);
        if (result.res.status == 200) {
            return true;
        }
    } catch (e) {
        return false;
    }
}
