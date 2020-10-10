package com.aihome.aihomesys.vo;

public class HotelInfo {
    private int hotelId;
    private String hotelName;
    private String hotelNotice;
    private String hotelLocation;

    @Override
    public String toString() {
        return "HotelInfo{" +
                "hotelId=" + hotelId +
                ", hotelName='" + hotelName + '\'' +
                ", hotelNotice='" + hotelNotice + '\'' +
                ", hotelLocation='" + hotelLocation + '\'' +
                '}';
    }

    public int getHotelId() {
        return hotelId;
    }

    public void setHotelId(int hotelId) {
        this.hotelId = hotelId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getHotelNotice() {
        return hotelNotice;
    }

    public void setHotelNotice(String hotelNotice) {
        this.hotelNotice = hotelNotice;
    }

    public String getHotelLocation() {
        return hotelLocation;
    }

    public void setHotelLocation(String hotelLocation) {
        this.hotelLocation = hotelLocation;
    }
}
