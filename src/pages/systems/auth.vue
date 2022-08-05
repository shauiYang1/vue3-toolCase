<!--
 * @Author: yangshuai u9h_75bugk181@dingtalk.com
 * @Date: 2022-06-17 11:36:43
 * @LastEditors: yangshuai u9h_75bugk181@dingtalk.com
 * @LastEditTime: 2022-08-04 10:07:26
 * @FilePath: \vue3-test\src\pages\systems\Auth.vue
 * @Description: 权限管理
-->
<template>
  <div class="system_auth">
    <div class="head-operate">
      <h4>权限管理</h4>
      <div>
        <el-input placeholder="搜索权限" v-model="state.name" size="small">
          <i name="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button @click="addAuth" type="primary" size="small"
          >新增权限</el-button
        >
      </div>
    </div>
    <div class="table-content">
      <el-table
        :header-cell-style="{
          color: '#061c32',
          height: '50px',
          background: '#EDF0F4',
          padding: 0,
          'font-size': '14px',
          'font-family': 'Microsoft YaHei',
          'font-weight': 'normal',
        }"
        :cell-style="{
          height: '50px',
          padding: 0,
          'line-height': '50px',
          'font-size': '14px',
          'font-family': 'Microsoft YaHei',
          color: '#061c32',
        }"
        :data="state.data"
        height="100%"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        highlight-current-row
        default-expand-all
        :row-class-name="tableRowClassName"
      >
        {{ state.data }}
        <el-table-column
          :formatter="format"
          align="left"
          prop="name"
          label="权限名称"
          width="220"
          fixed
        />
        <el-table-column align="left" prop="type" label="权限类型" width="120">
          <template #type>
            {{ getType(type.row.type) }}
          </template>
        </el-table-column>
        <el-table-column align="left" prop="scop" label="权限划分" width="120">
          <template #scope>
            {{ getScop(scope.row.scope) }}
          </template>
        </el-table-column>
        <el-table-column align="left" prop="menu" label="权限分组" width="120">
          <template #menu>
            {{ getGroup(menu.row.menu) }}
          </template>
        </el-table-column>
        <el-table-column
          :formatter="format"
          align="left"
          prop="method"
          label="方法"
          width="120"
        />
        <el-table-column
          :formatter="format"
          align="left"
          prop="url"
          label="路径"
          min-width="200"
        />
        <el-table-column
          :formatter="format"
          align="left"
          prop="description"
          label="描述"
          min-width="200"
        />
        <el-table-column align="left" label="操作" width="160" fixed="right">
          <template #scope>
            <div class="auth-operate">
              <el-button
                type="text"
                @click="editAuth(scope.$index, scope.row)"
                class="el-icon-edit"
                title="编辑权限"
              />
              <el-button
                type="text"
                @click="deleteAuth(scope.$index, scope.row)"
                class="el-icon-delete"
                title="删除权限"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, onMounted } from "vue";
import { defineComponent } from "@vue/composition-api";
import { fetchAuthTree } from "@/axios/api/auth";
import { format } from "@/utils";
import { AuthState } from "@/interfaces/systemsInterface";

export default defineComponent({
  name: "autoComponent",
  setup() {
    const state: AuthState = reactive({
      data: [],
      name: "",
    });
    onMounted(async () => {
      const data = await fetchAuthTree("0");
      state.data = data.data;
    });
    const tableRowClassName = ({ rowIndex }) => {
      return rowIndex % 2 ? "gray-row" : "lignt-row";
    };
    const addAuth = () => {};
    return {
      state,
      format,
      addAuth,
      tableRowClassName,
    };
  },
});
</script>
<style lang="scss" scoped>
.head-operate {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  text-align: right;
}
</style>
