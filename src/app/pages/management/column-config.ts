export const columnConfig = {
  province: [
    // { field: 'id', header: 'ID' },
    { field: 'maTinh', header: 'Mã tỉnh' },
    { field: 'tenTinh', header: 'Tên tỉnh' },
    { field: 'cap', header: 'Cấp' },
    { field: 'vungSinhThai', header: 'Vùng sinh thái' },
    { field: 'vungDiaLy', header: 'Vùng địa lý' },
    { field: 'vungMien', header: 'Vùng miền' },
    { field: 'isActive', header: 'Hoạt động', type: 'icon' },
  ],
  district: [
    // { field: 'id', header: 'ID' },
    { field: 'maTinh', header: 'Mã tỉnh' },
    { field: 'maHuyen', header: 'Mã huyện' },
    { field: 'tenHuyen', header: 'Tên huyện' },
    { field: 'cap', header: 'Cấp' },
    { field: 'isActive', header: 'Hoạt động', type: 'icon' },
  ],
  commune: [
    // { field: 'id', header: 'Commune ID' },
    { field: 'maTinh', header: 'Mã tỉnh' },
    { field: 'maHuyen', header: 'Mã huyện' },
    { field: 'maXa', header: 'Mã xã' },
    { field: 'tenXa', header: 'Tên xã' },
    { field: 'cap', header: 'Cấp' },
    { field: 'isActive', header: 'Hoạt động', type: 'icon' },
    { field: 'isXaNgheo', header: 'Xã nghèo', type: 'icon' },
    { field: 'isXaMienNui', header: 'Xã miền núi', type: 'icon' },
    { field: 'isXaDanToc', header: 'Xã dân tộc', type: 'icon' },
    { field: 'isThanhThi', header: 'Thành thị', type: 'icon' },
  ],
};

