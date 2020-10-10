package com.aihome.aihomesys.vo;

public class UserLabel {
    private int ulId;
    private String userId;
    private int typeId;
    private String typeName;

    public int getUlId() {
        return ulId;
    }

    public void setUlId(int ulId) {
        this.ulId = ulId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

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

    @Override
    public String toString() {
        return "UserLabel{" +
                "ulId=" + ulId +
                ", userId='" + userId + '\'' +
                ", typeId=" + typeId +
                ", typeName='" + typeName + '\'' +
                '}';
    }
}
