using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace StoreInventoryQuery.Common
{
    public static class Constants
    {
        /// <summary>
        /// 连接字符串
        /// </summary>
        public static readonly string F360str = ConfigurationManager.ConnectionStrings["F360"].ConnectionString;

        //////
        public static readonly string OssUrl = "http://120.76.56.45/swings_pim/api/product/img?partNumber=";
    }
}