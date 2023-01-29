const connection = require("../config/db");
const crypto = require("crypto");
const moment = require("moment-timezone");
const randomstring = require("randomstring");
const time = require("moment");
const { table } = require("console");
// Constructor
const product = {};

product.show_type_product = (data, result) => {
  let sql = ` select * from type_product`;
  // sql += `where dl = 0 order by  create_date DESC`;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.insert_type_product = (data, result) => {
  let obj = {
    ref_category_product_id: data.ref_category_product_id,
    name_th: data.name_th,
    name_en: data.name_en,
    feature_text: data.feature_text,
    image_logo: data.image_logo,
    video_logo: data.video_logo,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  connection.query(`insert into type_product set ?`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      let obj2 = {
        ref_type_product_id: res.insertId,
        name: "",
        banner_image: "",
        banner_name: "",
        banner_text_1: "",
        banner_text_2: "",
        banner_logo: "",
        feature_header: "",
        feature_text_1: "",
        feature_text_2: "",
        feature_list_image_vector: "",
        feature_list_image_slide: "",
        shade_text_1: "",
        shade_text_2: "",
        shade_glass: "",
        shade_video: "",
        protect_text_1: "",
        protect_text_2: "",
        protect_video: "",
        preview_video: "",
        manual_list_text: "",
        manual_list_image_slide: "",
        manual_text: "",
        performance_text_1: "",
        performance_text_2: "",
        packshot_image: "",
        table_image: "",
        footer_image_1: "",
        footer_image_2: "",
        footer_image_3: "",
        footer_image_4: "",
        footer_image_5: "",
        footer_image_6: "",
        footer_image_7: "",
        remark_list: "",
        pdf: "",
        compare: 0,
        create_by: data.create_by,
        update_by: data.update_by,
        is_active: true,
        sort: "",
      };
      connection.query(`insert into type_product_content set ?`, [obj2], (err2, res2) => {
        if (err2) {
          response = {
            code: 99,
            message: err2,
          };
        } else {
          response = {
            code: 200,
            message: "Success",
            data: res,
            data2: res2,
          };
          return result(null, response);
        }
      });
    }
  });
};
product.update_type_product = (data, result) => {
  console.log(data);
  let obj = {
    ref_category_product_id: data.ref_category_product_id,
    name_th: data.name_th,
    name_en: data.name_en,
    feature_text: data.feature_text,
    image_logo: data.image_logo,
    video_logo: data.video_logo,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update type_product set ? where id = ${data.id}`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.delete_type_product = (data, result) => {
  console.log(data);
  connection.query(`delete from type_product where id = ${data}`, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      connection.query(`delete from type_product_content where ref_type_product_id = ${data}`, (err2, res2) => {
        console.log(err2);
        if (err2) {
          response = {
            code: 99,
            message: err2,
          };
        } else {
          response = {
            code: 200,
            message: "Success",
            data: res,
            data2: res2,
          };
          return result(null, response);
        }
      });
    }
  });
};
product.show_type_product_content_all = (data, result) => {
  let sql = ` select id,ref_type_product_id,name,banner_text_1,banner_text_2,feature_list_image_vector,feature_header,shade_glass from type_product_content`;
  // sql += `where dl = 0 order by  create_date DESC`;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.show_type_product_content = (data, result) => {
  console.log(data);
  connection.query(`select * from type_product_content where ref_type_product_id = ${data}`, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.update_type_product_content = (data, result) => {
  console.log(data);
  let obj = {
    name: data.name,
    banner_image: data.banner_image,
    banner_name: data.banner_name,
    banner_text_1: data.banner_text_1,
    banner_text_2: data.banner_text_2,
    banner_logo: data.banner_logo,
    feature_header: data.feature_header,
    feature_text_1: data.feature_text_1,
    feature_text_2: data.feature_text_2,
    feature_list_image_vector: data.feature_list_image_vector,
    feature_list_image_slide: data.feature_list_image_slide,
    shade_text_1: data.shade_text_1,
    shade_text_2: data.shade_text_2,
    shade_glass: data.shade_glass,
    shade_video: data.shade_video,
    protect_text_1: data.protect_text_1,
    protect_text_2: data.protect_text_2,
    protect_video: data.protect_video,
    preview_video: data.preview_video,
    manual_list_text: data.manual_list_text,
    manual_list_image_slide: data.manual_list_image_slide,
    manual_text: data.manual_text,
    performance_text_1: data.performance_text_1,
    performance_text_2: data.performance_text_2,
    packshot_image: data.packshot_image,
    table_image: data.table_image,
    footer_image_1: data.footer_image_1,
    footer_image_2: data.footer_image_2,
    footer_image_3: data.footer_image_3,
    footer_image_4: data.footer_image_4,
    footer_image_5: data.footer_image_5,
    footer_image_6: data.footer_image_6,
    footer_image_7: data.footer_image_7,
    remark_list: data.remark_list,
    pdf: data.pdf,
    compare: data.compare,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: "",
  };
  console.log(obj);
  connection.query(`update type_product_content set ? where id = ${data.id}`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.show_category_product = (data, result) => {
  let sql = ` select * from category_product`;
  // sql += `where dl = 0 order by  create_date DESC`;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.insert_category_product = (data, result) => {
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image_logo: data.image_logo,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  connection.query(`insert into category_product set ?`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
      return result(null, response);
    }
  });
};
product.update_category_product = (data, result) => {
  console.log(data);
  let obj = {
    name_th: data.name_th,
    name_en: data.name_en,
    image_logo: data.image_logo,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update category_product set ? where id = ${data.id}`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.delete_category_product = (data, result) => {
  console.log(data);
  connection.query(`delete from category_product where id = ${data}`, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.show_product = (data, result) => {
  let sql = ` select * from product`;
  // sql += `where dl = 0 order by  create_date DESC`;
  connection.query(sql, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: "Fail",
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.insert_product = (data, result) => {
  let obj = {
    ref_type_product_id: data.ref_type_product_id,
    name_th: data.name_th,
    name_en: data.name_en,
    model_th: data.model_th,
    model_en: data.model_en,
    recommend: data.recommend,
    image_findyourglass: data.image_findyourglass,
    image_compare: data.image_compare,
    type_build: data.type_build,
    type_glass: data.type_glass,
    type_color: data.type_color,
    code_color: data.code_color,
    vlt: data.vlt,
    vlr_external: data.vlr_external,
    vlr_internal: data.vlr_internal,
    shgc: data.shgc,
    det: data.det,
    er: data.er,
    ea: data.ea,
    sc: data.sc,
    lsg: data.lsg,
    u_value: data.u_value,
    rhg: data.rhg,
    protect_1: data.protect_1,
    protect_2: data.protect_2,
    protect_3: data.protect_3,
    show_more_detail: data.name_th,
    glass_thickness: data.name_th,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  connection.query(`insert into product set ?`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
      return result(null, response);
    }
  });
};
product.update_product = (data, result) => {
  console.log(data);
  let obj = {
    ref_type_product_id: data.ref_type_product_id,
    name_th: data.name_th,
    name_en: data.name_en,
    model_th: data.model_th,
    model_en: data.model_en,
    recommend: data.recommend,
    image_findyourglass: data.image_findyourglass,
    image_compare: data.image_compare,
    type_build: data.type_build,
    type_glass: data.type_glass,
    type_color: data.type_color,
    code_color: data.code_color,
    vlt: data.vlt,
    vlr_external: data.vlr_external,
    vlr_internal: data.vlr_internal,
    shgc: data.shgc,
    det: data.det,
    er: data.er,
    ea: data.ea,
    sc: data.sc,
    lsg: data.lsg,
    u_value: data.u_value,
    rhg: data.rhg,
    protect_1: data.protect_1,
    protect_2: data.protect_2,
    protect_3: data.protect_3,
    show_more_detail: data.name_th,
    glass_thickness: data.name_th,
    create_by: data.create_by,
    update_by: data.update_by,
    is_active: true,
    sort: (data.sort !== null ? data.sort:0),
  };
  console.log(obj);
  connection.query(`update product set ? where id = ${data.id}`, [obj], (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};
product.delete_product = (data, result) => {
  console.log(data);
  connection.query(`delete from product where id = ${data}`, (err, res) => {
    if (err) {
      response = {
        code: 99,
        message: err,
      };
    } else {
      response = {
        code: 200,
        message: "Success",
        data: res,
      };
    }
    return result(null, response);
  });
};

module.exports = product;
