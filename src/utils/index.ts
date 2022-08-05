/*
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-17 17:08:36
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-06-17 17:10:49
 * @FilePath: \vue3-test\src\utils\formatter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function format(row, column, cellValue, index) {
    if (['', null, undefined].includes(cellValue)) {
        return '--'
    }
    return cellValue
}
