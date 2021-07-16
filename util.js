/**
 * 抛出错误信息
 * @param message string
 */
export function throwErrorMessage(message){
    throw new Error(message)
}

/**
 * 判断当前值是否能够呗JSON.stringify识别
 * @param data 需要判断的值
 * @returns boolean 当前参数是否可以string化
 */
export function hasStringify (data) {
    if (data === undefined) {
        return false
    }

    if (data instanceof Function) {
        return false
    }

    if (isSymbol(data)) {
        return false
    }

    return true
}

/**
 * 判断当前类型是否是Symbol
 * @param val 需要判断的值
 * @returns boolean 当前参数是否是symbol
 */
function isSymbol(val){
    return typeof val === 'symbol'
}


