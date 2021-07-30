using StoreInventoryQuery.Common;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using Oracle.ManagedDataAccess.Client;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StoreInventoryQuery.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Login(userlogin dy)
        {
            try
            {
                string name = dy.name;
                string pwd = dy.pwd;
                using (OracleConnection conn = new OracleConnection(Constants.F360str))
                {
                    conn.Open();
                    string sql = string.Format(@"select d.code,d.name  from regent.businessperson a  left join regent.channel d on a.channelid=d.channelid where a.code='{0}' and a.password='{1}'", name, pwd);
                    OracleDataAdapter oda = new OracleDataAdapter(sql, conn);
                    DataTable dt = new DataTable();
                    oda.Fill(dt);
                    if (dt.Rows.Count > 0)
                    {
                        return Json(new { code = true, data =new { code=dt.Rows[0]["code"],storename= dt.Rows[0]["name"] } });
                    }
                    return Json(new { code = false, msg = "账号或密码错误" });
                }
            }
            catch (Exception e)
            {
                return Json(new { code = false, msg = e.Message });
            }

        }










    }

    public class userlogin
    {

        public string name { get; set; }
        public string pwd { get; set; }
    }
}