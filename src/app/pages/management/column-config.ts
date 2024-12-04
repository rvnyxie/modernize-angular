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
    // { name: 'id', header: 'CommuneModel ID' },
    { name: 'maTinh', header: 'Mã tỉnh', type: 'text', required: true, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'maHuyen', header: 'Mã huyện', type: 'text', required: true, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'maXa', header: 'Mã xã', type: 'text', required: true, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'tenXa', header: 'Tên xã', type: 'text', required: true, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'cap', header: 'Cấp', type: 'text', required: false, errorMessage: 'Needed', isAddable: true, isEditable: true },
    { name: 'isActive', header: 'Hoạt động', type: 'select', required: false },
    { name: 'isXaNgheo', header: 'Xã nghèo', type: 'select', required: false },
    { name: 'isXaMienNui', header: 'Xã miền núi', type: 'select', required: false },
    { name: 'isXaDanToc', header: 'Xã dân tộc', type: 'select', required: false },
    { name: 'isThanhThi', header: 'Thành thị', type: 'select', required: false },
  ],
};

