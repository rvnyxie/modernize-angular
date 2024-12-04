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
    // { name: 'id', header: 'ID' },
    { name: 'maTinh', header: 'Mã tỉnh', type: 'text', required: true, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'maHuyen', header: 'Mã huyện', type: 'text', required: true, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'tenHuyen', header: 'Tên huyện', type: 'text', required: true, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'cap', header: 'Cấp', type: 'text', required: true, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'isActive', header: 'Hoạt động', type: 'select', required: false },
  ],
  commune: [
    // { name: 'id', header: 'Commune ID' },
    { name: 'maTinh', header: 'Mã tỉnh' },
    { name: 'maHuyen', header: 'Mã huyện' },
    { name: 'maXa', header: 'Mã xã' },
    { name: 'tenXa', header: 'Tên xã' },
    { name: 'cap', header: 'Cấp' },
    { name: 'isActive', header: 'Hoạt động', type: 'select' },
    { name: 'isXaNgheo', header: 'Xã nghèo', type: 'select' },
    { name: 'isXaMienNui', header: 'Xã miền núi', type: 'select' },
    { name: 'isXaDanToc', header: 'Xã dân tộc', type: 'select' },
    { name: 'isThanhThi', header: 'Thành thị', type: 'select' },
  ],
};

