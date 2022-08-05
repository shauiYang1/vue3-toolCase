/*
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-17 16:28:28
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-06-30 14:31:12
 * @FilePath: \vue3-test\src\axios\api\auth.ts
 * @Description: 权限接口相关
 */
import { request } from "../index";

//  查询权限树
export function fetchAuthTree(type: string): Promise<any> {
    return request({
        url: `/auth/tree/${type}`,
        method: 'get'
    });
}
