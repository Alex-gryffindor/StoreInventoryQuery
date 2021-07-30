using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StoreInventoryQuery.Common
{
    /// <summary>
    /// Name:图库返回的图片地址实体
    /// Author:Amber
    /// Date:2020-03-07 16:15:17
    /// </summary>
    public class ImgResponse
    {
        /// <summary>
        /// 状态码
        /// </summary>
        public string code { get; set; }

        /// <summary>
        /// 信息
        /// </summary>
        public string msg { get; set; }

        
        /// <summary>
        /// 图片地址
        /// </summary>
        public string imgPath { get; set; }
    }
}
