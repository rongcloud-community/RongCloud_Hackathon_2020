package com.aihome.aihomesys.vo;

public class MealInfo {
    private int mealId;
    private int stapleId;
    private String stapleName;
    private String stapleCacul;
    private int MEMId;
    private String MEMName;
    private String MEMCacul;
    private int VFId;
    private String VFName;
    private String VFCacul;
    private int GreaseId;
    private String GreaseName;
    private String GreaseCacul;
    private int OtherId;
    private String OtherName;
    private String OtherCacul;
    private int totalFatB;
    private int hotelId;
    private int mealType;

    @Override
    public String toString() {
        return "MealInfo{" +
                "mealId=" + mealId +
                ", stapleId=" + stapleId +
                ", stapleName='" + stapleName + '\'' +
                ", stapleCacul='" + stapleCacul + '\'' +
                ", MEMId=" + MEMId +
                ", MEMName='" + MEMName + '\'' +
                ", MEMCacul='" + MEMCacul + '\'' +
                ", VFId=" + VFId +
                ", VFName='" + VFName + '\'' +
                ", VFCacul='" + VFCacul + '\'' +
                ", GreaseId=" + GreaseId +
                ", GreaseName='" + GreaseName + '\'' +
                ", GreaseCacul='" + GreaseCacul + '\'' +
                ", OtherId=" + OtherId +
                ", OtherName='" + OtherName + '\'' +
                ", OtherCacul='" + OtherCacul + '\'' +
                ", totalFatB=" + totalFatB +
                ", hotelId=" + hotelId +
                ", mealType=" + mealType +
                '}';
    }

    public int getMealId() {
        return mealId;
    }

    public void setMealId(int mealId) {
        this.mealId = mealId;
    }

    public int getStapleId() {
        return stapleId;
    }

    public void setStapleId(int stapleId) {
        this.stapleId = stapleId;
    }

    public String getStapleName() {
        return stapleName;
    }

    public void setStapleName(String stapleName) {
        this.stapleName = stapleName;
    }

    public String getStapleCacul() {
        return stapleCacul;
    }

    public void setStapleCacul(String stapleCacul) {
        this.stapleCacul = stapleCacul;
    }

    public int getMEMId() {
        return MEMId;
    }

    public void setMEMId(int MEMId) {
        this.MEMId = MEMId;
    }

    public String getMEMName() {
        return MEMName;
    }

    public void setMEMName(String MEMName) {
        this.MEMName = MEMName;
    }

    public String getMEMCacul() {
        return MEMCacul;
    }

    public void setMEMCacul(String MEMCacul) {
        this.MEMCacul = MEMCacul;
    }

    public int getVFId() {
        return VFId;
    }

    public void setVFId(int VFId) {
        this.VFId = VFId;
    }

    public String getVFName() {
        return VFName;
    }

    public void setVFName(String VFName) {
        this.VFName = VFName;
    }

    public String getVFCacul() {
        return VFCacul;
    }

    public void setVFCacul(String VFCacul) {
        this.VFCacul = VFCacul;
    }

    public int getGreaseId() {
        return GreaseId;
    }

    public void setGreaseId(int greaseId) {
        GreaseId = greaseId;
    }

    public String getGreaseName() {
        return GreaseName;
    }

    public void setGreaseName(String greaseName) {
        GreaseName = greaseName;
    }

    public String getGreaseCacul() {
        return GreaseCacul;
    }

    public void setGreaseCacul(String greaseCacul) {
        GreaseCacul = greaseCacul;
    }

    public int getOtherId() {
        return OtherId;
    }

    public void setOtherId(int otherId) {
        OtherId = otherId;
    }

    public String getOtherName() {
        return OtherName;
    }

    public void setOtherName(String otherName) {
        OtherName = otherName;
    }

    public String getOtherCacul() {
        return OtherCacul;
    }

    public void setOtherCacul(String otherCacul) {
        OtherCacul = otherCacul;
    }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public int getMealType() {
        return mealType;
    }

    public void setMealType(int mealType) {
        this.mealType = mealType;
    }

    public int getTotalFatB() {
        return totalFatB;
    }

    public void setTotalFatB(int totalFatB) {
        this.totalFatB = totalFatB;
    }
}
