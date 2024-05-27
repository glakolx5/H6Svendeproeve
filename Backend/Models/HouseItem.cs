namespace Backend.Models;

public class HouseItem
{
    public Guid Id { get; set; }
    public string Town { get; set; } = "town_null";
    public string Price { get; set; } = "price_null";
    public string ImageSrc { get; set; } = "image_null";
    public DateTime DateFrom { get; set; }
    public DateTime DateTo { get; set; }

}
