/**
 * API接口统一管理
 */
module.exports = {
	index:"Index/index",//首页授权界面
	personal:'index/personal',//我的列表
	client:'Index/Client',//客户列表
	merchantList:'Index/Merchant',//供应商列表
	addMerchant:'Index/addMerchant',//添加供应商
	editMerchant:'Index/editMerchant',//编辑供货商
	deleteMerchant:'Index/deleteMerchant',//删除供货商
    banner: "Warehouse/get_rotation",
    login: "Login/indexs",//登录
    bind: "Login/bind",//绑定账号
    userData: "Users/userData",//个人资料
    merchant: "Index/merchant_info",//公司信息
	eidt_merchant:'Index/eidt_merchant',//修改公司设置
	copy:'Index/address',//复制网址
    client: "Index/Client",//客户列表接口
    addClient: "Index/addClient",//添加客户
	deleteCilent:'Index/deleteCilent',//删除客户
    editClient: "Index/editCilent",//编辑客户
    clientDown: "Warehouse/get_client_data",
    stock: "Warehouse/stock_list",//库存管理
	infoData:"Index/info_data",//首页数据接口  今日入库。。。
	warehouseList:"Index/WarehouseList",//库存列表
	goods_list:"Warehouse/goods_list",//商品列表
    good: "Warehouse/get_goods_data",
    export: "Warehouse/export_list",//出库记录
	export_del:"Warehouse/repeal_export",//撤销出库
	export_details:"Warehouse/export_details",//出库详情
	import_list:"Warehouse/import_list",//入库列表
	import_del:"Warehouse/delete_import",//删除入库记录
	import_details:"Warehouse/import_details",//入库详情
	be_put:'Warehouse/new_be_put',//添加入库
	export_price_list:"Warehouse/export_price_list",//出库商品价格
    addExport: "Warehouse/new_be_come",//添加出库
	ShopList:'Index/ShopList',//商品列表
	deleteShop:'Index/deleteShop',//删除商品
    goods_details: "Warehouse/goods_details",//商品详情
	addShop:'Index/addShop',//添加商品
	editShop:'Index/editShop',//编辑商品
    updatePrice: "Warehouse/update_price_by_count",
    record: "Warehouse/buy_record",
    getQrcode: "Warehouse/get_account",
    upload: "Image/upload",
	check_list:'Warehouse/check_list',//盘点主列表
	repeal:'Warehouse/repeal',//撤销盘点
	check_detail:'Warehouse/check_detail',//盘点详情
	take_stock:'Warehouse/take_stock',//盘点列表
	new_affirm_check:'Warehouse/new_affirm_check',//确认盘点
	shop_unit:'Index/shop_unit',//计量单位列表
	addShopUnit:'Index/addShopUnit',//添加计量单位
	editShopUnit:'Index/editShopUnit',//编辑计量单位
	deleteShopUnit:'Index/deleteShopUnit',//删除单位名称
	addWarehouse:'Index/addWarehouse',//添加仓库
	editWarehouse:'Index/editWarehouse',//编辑仓库
	deleteWarehouse:'Index/deleteWarehouse',//删除仓库
	on_off_Warehouse:'Index/on_off_Warehouse',//仓库启用停用
	shopType:'Index/ShopType',//商品分类列表
	deleteShopType:'Index/deleteShopType',//删除分类
	addShopType:'Index/addShopType',//添加分类
	editShopType:'Index/editShopType',//编辑分类
	on_off:'Index/on_off',//启用 停用 分类
	profit:'Warehouse/profit',//利润首页
	results_index:'Statistics/index',//业绩列表
	operation_type:'Warehouse/operation_type',//操作类型列表
	operation_list:'Warehouse/operation_list',//操作记录列表
	operation_details:'Warehouse/operation_details',//操作详情
	staffList:'index/staffList',//员工列表
	miniprogram:'index/miniprogram',//小程序权限
	authorize:'index/authorize',//后台权限
	new_addStaff:'index/new_addStaff',//添加员工
	new_editStaff:'index/new_editStaff',//编辑员工
	deleteStaff:'index/deleteStaff',//删除员工
	helpList:'Index/helpList',//帮助中心
	search_list:'Index/search_list',//帮助中心列表
	help_details:'Index/help_details',//帮助详情
	
	export_data:'stock/export_data',//
	
	warehouse_purchase_list:'warehouse/purchase_list',//采购列表
	warehouse_purchase_details:'warehouse/purchase_details',//采购详情
	warehouse_purchase:'warehouse/purchase',//添加采购单
	warehouse_purchase_check:'warehouse/purchase_check',//采购审核
	warehouse_input_submit:'warehouse/input_submit',//采购入库
}
