
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace StoreInventoryQuery.Common
{
    /// <summary>
    /// Name:图片相关工具
    /// Author:Amber
    /// Date:2020-03-07 15:51:12
    /// </summary>
    public class ImgUtil
    {
        /// <summary>
        /// 获取产品主图
        /// </summary>
        /// <param name="goodsNo">9位SKU 或 11位SKC</param>
        /// <returns></returns>
        public static string GetGoodsImg(string goodsNo)
        {
            try
            {
                if (goodsNo.Length != 9 && goodsNo.Length != 11)
                {
                    //LogHelper.Warn($"获取产品主图时，传入的货品编号格式错误，货品编号:{goodsNo}");
                }
                string requestUrl = Constants.OssUrl + goodsNo;
                ImgResponse imgResponse = Get<ImgResponse>(requestUrl);
                if (imgResponse?.imgPath != null)
                {
                    return imgResponse.imgPath;
                }
                //LogHelper.Warn($"获取产品主图失败，接口响应消息{imgResponse.msg}");
            }
            catch (Exception ex)
            {
                //LogHelper.Error($"获取产品主图失败，{ex.Message}");
            }
            return "";
        }

        public static T Get<T>(string url)
        {

            HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
            HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
            Stream stream = resp.GetResponseStream();
            try
            {
                //获取内容
                using (StreamReader reader = new StreamReader(stream))
                {
                    var result = reader.ReadToEnd();

                    return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(result);
                }
            }
            finally
            {
                stream.Close();
            }
        }
    }
}
