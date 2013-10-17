using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.Collections.Generic;
public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }


    [System.Web.Services.WebMethod]
    public static string doIt()
    {
        return "DoingShit.jpg";
    }

    [System.Web.Services.WebMethod]
    public static void DoWork(String input)
    {
        var serializer = new JavaScriptSerializer();
        Dictionary<string, string> rateDict = serializer.Deserialize<Dictionary<string, string>>(input);

        Console.WriteLine("OLOLOL");
 //
//          var data = json.Deserialize<Array>(input);
        //<Dictionary<string, Dictionary<string, string>>[]>
        
    }
}
