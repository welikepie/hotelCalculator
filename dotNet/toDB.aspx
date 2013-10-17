[WebMethod]
public static void ToDatabase(Dictionary<string, object> sites)
{
    using (MyDataContext db = new MyDataContext()) {
            db.MyItems.InsertOnSubmit(new MyItem {
                Url = sites("url"),
                Description = sites("description"),
                Language = sites("language")
            });
            db.SubmitChanges();
        
    }

}