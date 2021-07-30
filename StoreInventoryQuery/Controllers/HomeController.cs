using Oracle.ManagedDataAccess.Client;
using StoreInventoryQuery.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace StoreInventoryQuery.Controllers
{
    public class HomeController : Controller
    {
        static string url = "http://120.76.56.45/swings_pim/api/product/img?partNumber=";
        public JsonResult SelSku(selsku s)
        {
            Logger.WriteInfo("门店：" + s.code + "查询SKU：" + s.sku);
            try
            {
                using (OracleConnection conn = new OracleConnection(Constants.F360str))
                {
                    conn.Open();

                    string sql = string.Format(@"select aa.colorcode,aa.sku, aa.name, b.goodsname,aa.SIZEDESC,c.colordesc,qty,vqty,(qty-vqty) as yqty from regent.RG00018 aa  
                                                        left join goods b on b.goodsid=aa.goodsid
                                                        left join  color c on c.COLORCODE=aa.COLORCODE 
                                                         where aa.code='{0}' and aa.sku like '{1}%'   order by (case when SIZEDESC='XXXS' then '0'
                                                             when SIZEDESC ='XXXS' then '0'
                                                        	  when SIZEDESC ='XXS' then '1'
                                                              when SIZEDESC ='XS' then '2'
                                                              when SIZEDESC='S' then '3'
                                                              when SIZEDESC='M' then '4'
                                                        	  when SIZEDESC='L' then '5'
                                                        	  when SIZEDESC='XL' then '6'
                                                        	  when SIZEDESC='XXL' then '7'
                                                        	   when SIZEDESC='XXXL' then '8'
                                                        	   when SIZEDESC='XXXXL' then '9'
                                                        	   when SIZEDESC='XXXXXL' then '10'
                                                        	   when SIZEDESC='XXXXXXL' then '11'
                                                        	   when SIZEDESC='XXXXXXXL' then '12'
                                                        	   else TO_CHAR(SIZEDESC)
                                                         end) ASC", s.code, s.sku);
                    OracleDataAdapter oda = new OracleDataAdapter(sql, conn);
                    DataTable dt = new DataTable();
                    oda.Fill(dt);


                    var list = dt.AsEnumerable().Select(d => new
                    {
                        colorcode = d["colorcode"].ToString(),
                        size = d["SIZEDESC"].ToString(),
                        name = d["goodsname"].ToString(),
                        color = d["colordesc"].ToString(),
                        yqty = d["yqty"].ToString(),
                        vqty = d["vqty"].ToString(),
                        qty = d["qty"].ToString(),
                        storename = d["name"].ToString(),
                        img = ImgUtil.GetGoodsImg(d["sku"].ToString().Length > 9 ? d["sku"].ToString().Substring(0, 9) + d["colorcode"].ToString() : d["sku"].ToString())

                    }).ToList();
                    return Json(new { code = true, data = list });

                }
            }
            catch (Exception e)
            {
                Logger.WriteInfo("错误：" + e.Message);
                return Json(new { code = false, msg = e.Message });
            }

        }
        public JsonResult get()
        {
            return Json("1", JsonRequestBehavior.AllowGet);
        }


        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public class selsku
        {
            public string code { get; set; }
            public string sku { get; set; }
        }
    }
}