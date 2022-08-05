/*
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-08-05 14:20:10
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-08-05 15:19:46
 * @FilePath: \vue3-test\src\interfaces\ffmpeginterfaces.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface State {
    video: string | null,
    oldVideo: string | null,
    message: string,
    maxSliderValue: number,
    value: number[],
    file: Object | any,
}
