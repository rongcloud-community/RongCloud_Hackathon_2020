package com.aihome.aihomesys.vo;

public class LabelType {
    private int typeId;
    private String typeName;
    private int typeCount;
    private int isValid;

    public int getTypeId() {
        return typeId;
    }

    public void setTypeId(int typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public int getTypeCount() {
        return typeCount;
    }

    public void setTypeCount(int typeCount) {
        this.typeCount = typeCount;
    }

    public int getIsValid() {
        return isValid;
    }

    public void setIsValid(int isValid) {
        this.isValid = isValid;
    }

    @Override
    public String toString() {
        return "LabelType{" +
                "typeId=" + typeId +
                ", typeName=" + typeName +
                ", typeCount=" + typeCount +
                ", isValid=" + isValid +
                '}';
    }
}
