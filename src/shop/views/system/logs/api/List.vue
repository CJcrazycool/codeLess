<template>
    <div class="page-panel page-panel-body">
        <tab value="api"></tab>
        <div class="dataview-layout">
            <div class="dataview-content">
                <tableView ref="table" row-key="id" size="small" :search-form="searchForm"
                           :select-rows.sync="selectRows" :load-request="logApi.interfaceLogPageList()">
                    <template slot="search">
<!--                        <el-form-item label="关键字">-->
<!--                            <el-input v-model="searchForm.keyword" placeholder="关键字"></el-input>-->
<!--                        </el-form-item>-->
                        <el-form-item label="接口类型">
                            <el-input v-model="searchForm.type" placeholder="接口类型"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="searchForm.mobile" placeholder="手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="订单号">
                            <el-input v-model="searchForm.orderSn" placeholder="订单号"></el-input>
                        </el-form-item>
                        <el-form-item label="客历号">
                            <el-input v-model="searchForm.profileId" placeholder="客历号"></el-input>
                        </el-form-item>
                        <el-form-item label="会员ID">
                            <el-input v-model="searchForm.memberId" placeholder="会员ID"></el-input>
                        </el-form-item>
                        <el-form-item label="耗时大于(ms)">
                            <el-input-number v-model="searchForm.costTime" placeholder="耗时"></el-input-number>
                        </el-form-item>
                        <el-form-item label="异常">
                            <dictSelect dict-key="boolean" v-model="searchForm.isException" placeholder="异常"
                                        :clearable="true" style="width: 100px"></dictSelect>
                        </el-form-item>
                        <el-form-item label="请求结果">
                            <dictSelect dict-key="is_success" v-model="searchForm.isSuccess" placeholder="请求结果"
                                        :clearable="true" style="width: 100px"></dictSelect>
                        </el-form-item>
                        <el-form-item label="记录时间">
                            <dateRange :begin-value.sync="searchForm.startDate"
                                       :end-value.sync="searchForm.endDate"></dateRange>
                        </el-form-item>
                    </template>

                    <el-table-column label="接口类型" min-width="100" prop="type"></el-table-column>
                    <el-table-column label="客历号" min-width="150" prop="profileId"></el-table-column>
                    <el-table-column label="订单号" min-width="150" prop="orderSn">
                    </el-table-column>
                    <el-table-column label="手机号" min-width="100" prop="mobile">
                    </el-table-column>
                    <el-table-column label="请求结果" min-width="50" prop="isSuccess_dictText">
                    </el-table-column>
                    <el-table-column label="是否异常" min-width="60" prop="isException_dictText">
                    </el-table-column>
                    <el-table-column label="错误信息" min-width="100" prop="errorInfo" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="耗时(ms)" min-width="50" prop="costTime">
                    </el-table-column>
                    <el-table-column label="记录时间" prop="createTime" min-width="200"></el-table-column>

                    <el-table-column width="100" align="center">
                        <template slot-scope="scope">
                            <el-button size="small" type="text" @click="view(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </tableView>
            </div>
        </div>

        <el-drawer :append-to-body="true" title="详情" :visible.sync="viewVisible" size="700px" @open="viewAlive=true"
                   @closed="viewAlive=false">
            <ViewForm v-if="viewAlive" @cancel="viewVisible=false" :id="currRow.id"></ViewForm>
        </el-drawer>

    </div>
</template>

<script>
    import logApi from '@shop/api/logs'
    import ViewForm from './ViewForm'
    import tab from '../Tab'

    export default {
        components: {
            ViewForm,
            tab
        },
        data() {
            return {
                logApi,
                selectRows: [],
                viewVisible: false,
                viewAlive: false,
                searchForm: {
                    startDate: '',
                    endDate: ''
                },
                currRow: null
            }
        },
        computed: {},
        created() {

        },
        methods: {
            view(row) {
                this.currRow = row
                this.viewVisible = true
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
