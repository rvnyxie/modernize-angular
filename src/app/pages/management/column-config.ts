export const columnConfig = {
  province: [
    // { name: 'id', header: 'ID', isAddable: false, isEditable: false },
    { name: 'maTinh', header: 'Mã tỉnh', type: 'text', required: true, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'tenTinh', header: 'Tên tỉnh', type: 'text', required: true, isAddable: true, isEditable: true },
    { name: 'cap', header: 'Cấp', type: 'text', required: false, isAddable: true, isEditable: true },
    { name: 'vungSinhThai', header: 'Vùng sinh thái', type: 'text', required: false, isAddable: true, isEditable: true },
    { name: 'vungDiaLy', header: 'Vùng địa lý', type: 'text', required: false, isAddable: true, isEditable: true },
    { name: 'vungMien', header: 'Vùng miền', type: 'text', required: false, isAddable: true, isEditable: true },
    { name: 'isActive', header: 'Hoạt động', type: 'select', required: false, options: [
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ]},
  ],
  district: [
    // { field: 'id', header: 'ID' },
    { field: 'maTinh', header: 'Mã tỉnh' },
    { field: 'maHuyen', header: 'Mã huyện' },
    { field: 'tenHuyen', header: 'Tên huyện' },
    { field: 'cap', header: 'Cấp' },
    { field: 'isActive', header: 'Hoạt động', type: 'select' },
  ],
  commune: [
    // { field: 'id', header: 'Commune ID' },
    { field: 'maTinh', header: 'Mã tỉnh' },
    { field: 'maHuyen', header: 'Mã huyện' },
    { field: 'maXa', header: 'Mã xã' },
    { field: 'tenXa', header: 'Tên xã' },
    { field: 'cap', header: 'Cấp' },
    { field: 'isActive', header: 'Hoạt động', type: 'select' },
    { field: 'isXaNgheo', header: 'Xã nghèo', type: 'select' },
    { field: 'isXaMienNui', header: 'Xã miền núi', type: 'select' },
    { field: 'isXaDanToc', header: 'Xã dân tộc', type: 'select' },
    { field: 'isThanhThi', header: 'Thành thị', type: 'select' },
  ],
};

