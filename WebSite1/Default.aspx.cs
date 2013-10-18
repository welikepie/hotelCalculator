using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;

public partial class _Default : System.Web.UI.Page
{
    private static String username = "alex@d5pbz8wsoz";
    private static String password = "Herebedragons1";
    private static String dbName = "TestDB";
    private static String tableName = "inputs";
    private static String serverName = "d5pbz8wsoz.database.windows.net,1433";

    protected void Page_Load(object sender, EventArgs e)
    {

    }


    [System.Web.Services.WebMethod]
    public static string doIt()
    {
        return "DoingShit.jpg";
    }

   /*
    * {"companyInput":"weelie",
    * "number-of-rooms":4,
    * "currency":"EUR",
    * "average-room-rate":3,
    * "contactInput":"akex ric",
    * "emailInput":"alex.roche@live.com",
    * "phoneInput":"00434545435"} 
    * 
    */

    public class ToDatabase
    {
        public string companyInput { get; set; }
        public int numberofrooms { get; set; }
        public int averageroomrate { get; set; }
        public string currency { get; set; }
        public string contactInput { get; set; }
        public string emailInput { get; set; }
        public string phoneInput { get; set; }

        public float numTransactionOutput { get; set; }
        public float ATVOutput { get; set; }
        public float TurnoverOutput { get; set;}
        public float valueOutput { get; set; }
        public int upsellOutput { get; set; }
    }

    [System.Web.Services.WebMethod]
    public static void DoWork(String input)
    {
        string connectionString = "Persist Security Info=False;";
        connectionString += "User ID=" + username+";" ;
        connectionString += "Password="+password+";";
        connectionString+= "Initial Catalog="+dbName+";";
        connectionString += "Server=" + serverName + ";";
        JavaScriptSerializer parser = new JavaScriptSerializer();
        var info = parser.Deserialize<ToDatabase>(input);
 
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            SqlCommand cmd = new SqlCommand("INSERT INTO " + tableName + " (companyInput, numberofrooms, averageroomrate,currency,contactInput,emailInput,phoneInput,transactionCountOutput,ATVOutput,turnoverOutput,valueMinOutput,upsellOutput) VALUES (@company, @roomCount, @roomRate,@currency,@contactInput,@emailInput,@phoneInput,@transCountOut,@ATVOut,@TurnoverOut,@valueMinOut,@upsellOut)");
            cmd.CommandType = CommandType.Text;
            cmd.Connection = connection;
            if (info.companyInput != null)
            {
                cmd.Parameters.AddWithValue("@company", info.companyInput);
            }
            else {
                cmd.Parameters.AddWithValue("@company", "");
            }
            if (info.numberofrooms != null)
            {
                cmd.Parameters.AddWithValue("@roomCount", info.numberofrooms);
            }
            else {
                cmd.Parameters.AddWithValue("@roomCount", -1);
            }
            if (info.averageroomrate != null)
            {
                cmd.Parameters.AddWithValue("@roomRate", info.averageroomrate);
            }
            else
            {
                cmd.Parameters.AddWithValue("@roomRate", -1);
            }

            if (info.currency != null)
            {
                cmd.Parameters.AddWithValue("@currency", info.currency);
            }
            else
            {
                cmd.Parameters.AddWithValue("@currency", "");
            }

            if (info.contactInput != null)
            {
                cmd.Parameters.AddWithValue("@contactInput", info.contactInput);
            }
            else
            {
                cmd.Parameters.AddWithValue("@contactInput", "");
            }

            if (info.emailInput != null)
            {
                cmd.Parameters.AddWithValue("@emailInput", info.emailInput);
            }
            else
            {
                cmd.Parameters.AddWithValue("@emailInput", "");
            }

            if (info.phoneInput != null)
            {
                cmd.Parameters.AddWithValue("@phoneInput", info.phoneInput);
            }
            else
            {
                cmd.Parameters.AddWithValue("@phoneInput", "");
            }
            
            if (info.upsellOutput != null)
            {
                cmd.Parameters.AddWithValue("@upsellOut", info.upsellOutput);
            }
            else
            {
                cmd.Parameters.AddWithValue("@upsellOut", "");
            }

            if (info.valueOutput != null)
            {
                cmd.Parameters.AddWithValue("@valueMinOut", info.valueOutput);
            }
            else
            {
                cmd.Parameters.AddWithValue("@valueMinOut", "");
            }

            if (info.TurnoverOutput != null)
            {
                cmd.Parameters.AddWithValue("@TurnoverOut", info.TurnoverOutput);
            }
            else
            {
                cmd.Parameters.AddWithValue("@TurnoverOut", "");
            }

            if (info.ATVOutput != null)
            {
                cmd.Parameters.AddWithValue("@ATVOut", info.ATVOutput);
            }
            else
            {
                cmd.Parameters.AddWithValue("@ATVOut", "");
            }

            if (info.numTransactionOutput != null)
            {
                cmd.Parameters.AddWithValue("@transCountOut", info.numTransactionOutput);
            }
            else
            {
                cmd.Parameters.AddWithValue("@transCountOut", "");
            }

            connection.Open();
            cmd.ExecuteNonQuery();
        }
    }
}
