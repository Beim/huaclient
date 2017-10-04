exports.httpget = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.responseType = "json"
        xhr.open('GET', url, true)
        xhr.onload = function (e) {
            if (this.status === 200 || this.status === 304) {
                resolve(this.response)
            }
            else {
                resolve(null)
            }
        }
        xhr.send()
    })
}

// 将数组中的某个元素移动到数组的开头
exports.move_front = (arr, item) => {
    let idx = arr.indexOf(item)
    if (idx < 0) return
    arr.splice(idx, 1)
    arr.splice(0, 0, item)
}
