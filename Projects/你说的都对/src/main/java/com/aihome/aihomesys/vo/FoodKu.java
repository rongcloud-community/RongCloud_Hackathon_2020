package com.aihome.aihomesys.vo;

public class FoodKu {
    private int foodId;
    private int hotelId;
    private String foodName;
    private String foodType;
    private String foodCacul;
    private String foodContent;
    private int foodFatB;

    @Override
    public String toString() {
        return "FoodKu{" +
                "foodId=" + foodId +
                ", hotelId=" + hotelId +
                ", foodName='" + foodName + '\'' +
                ", foodType='" + foodType + '\'' +
                ", foodCacul='" + foodCacul + '\'' +
                ", foodContent='" + foodContent + '\'' +
                ", foodFatB=" + foodFatB +
                '}';
    }

    public int getFoodId() {
        return foodId;
    }

    public void setFoodId(int foodId) {
        this.foodId = foodId;
    }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public String getFoodCacul() {
        return foodCacul;
    }

    public void setFoodCacul(String foodCacul) {
        this.foodCacul = foodCacul;
    }

    public String getFoodContent() {
        return foodContent;
    }

    public void setFoodContent(String foodContent) {
        this.foodContent = foodContent;
    }

    public int getFoodFatB() {
        return foodFatB;
    }

    public void setFoodFatB(int foodFatB) {
        this.foodFatB = foodFatB;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }
}
