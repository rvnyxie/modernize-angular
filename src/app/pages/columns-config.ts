/**
 * Including columns information, defines attributes about each column in each management component entity
 * This information will be used to generate table, form used in management components
 */
export const columnsConfig: Record<string, ColumnInfoUsedForGeneration[]> = {
  province:  [
    // { name: "id", header: "ID", isAddable: false, isEditable: false },
    { name: "maTinh", header: "Mã tỉnh", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "tenTinh", header: "Tên tỉnh", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "cap", header: "Cấp", type: "text", required: false, errorMessage: "Error", isAddable: true, isEditable: true },
    { name: "vungSinhThai", header: "Vùng sinh thái", type: "text", required: false, errorMessage: "Error", isAddable: true, isEditable: true },
    { name: "vungDiaLy", header: "Vùng địa lý", type: "text", required: false, errorMessage: "Error", isAddable: true, isEditable: true },
    { name: "vungMien", header: "Vùng miền", type: "text", required: false, errorMessage: "Error", isAddable: true, isEditable: true },
    { name: "isActive", header: "Hoạt động", type: "select", required: false, errorMessage: "Error", isAddable: true, isEditable: true, options: [
        { label: "Có", value: true },
        { label: "Không", value: false }
      ]},
  ],
  district: [
    // { name: "id", header: "ID" },
    { name: "maTinh", header: "Mã tỉnh", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "maHuyen", header: "Mã huyện", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "tenHuyen", header: "Tên huyện", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "cap", header: "Cấp", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "isActive", header: "Hoạt động", type: "select", required: false, errorMessage: "Error", isAddable: true, isEditable: true, options: [
        { label: "Có", value: true },
        { label: "Không", value: false }
      ] },
  ],
  commune: [
    // { name: "id", header: "CommuneModel ID" },
    { name: "maTinh", header: "Mã tỉnh", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "maHuyen", header: "Mã huyện", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "maXa", header: "Mã xã", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "tenXa", header: "Tên xã", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "cap", header: "Cấp", type: "text", required: false, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "isActive", header: "Hoạt động", type: "select", required: false, errorMessage: "Error", isAddable: true, isEditable: true, options: [
        { label: "Có", value: true },
        { label: "Không", value: false }
      ] },
    { name: "isXaNgheo", header: "Xã nghèo", type: "select", required: false, errorMessage: "Error", isAddable: true, isEditable: true, options: [
        { label: "Có", value: true },
        { label: "Không", value: false }
      ] },
    { name: "isXaMienNui", header: "Xã miền núi", type: "select", required: false, errorMessage: "Error", isAddable: true, isEditable: true, options: [
        { label: "Có", value: true },
        { label: "Không", value: false }
      ] },
    { name: "isXaDanToc", header: "Xã dân tộc", type: "select", required: false, errorMessage: "Error", isAddable: true, isEditable: true, options: [
        { label: "Có", value: true },
        { label: "Không", value: false }
      ] },
    { name: "isThanhThi", header: "Thành thị", type: "select", required: false, errorMessage: "Error", isAddable: true, isEditable: true, options: [
        { label: "Có", value: true },
        { label: "Không", value: false }
      ] },
  ],
  product: [
    { name: "id", header: "Product ID", type: "text", required: true, errorMessage: "Needed", isAddable: false, isEditable: false },
    { name: "name", header: "Name", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "price", header: "Price", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "quantity", header: "Quantity", type: "text", required: true, errorMessage: "Needed", isAddable: true, isEditable: true },
    { name: "groupId", header: "Product's group", type: "text", required: false, errorMessage: "Needed", isAddable: false, isEditable: false },
  ]
};

export interface ColumnInfoUsedForGeneration {
  name: string,
  header: string,
  type: "text" | "checkbox" | "radio" | "select",
  required: boolean,
  errorMessage: string | null,
  isAddable: boolean,
  isEditable: boolean,
  options?: { label: string, value: boolean }[],
}

