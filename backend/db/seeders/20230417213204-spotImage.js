'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   options.tableName='SpotImages';
   await queryInterface.bulkInsert(options,[
    {
      "spotId":1,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684031045/Airbnb-images/9bcab1d0-3f5c-4f9e-a3ea-371152e03789_o1zk1c.webp',
      "preview":true
    },
    {
      "spotId":1,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684031106/Airbnb-images/d76e671c-3129-4ce1-a135-44697c161cd0_yzuuzd.webp',
      "preview":true
    },
    {
      "spotId":1,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684031097/Airbnb-images/ae3cddfd-ebcf-4ce6-9906-b79fd13afc31_vgrcs4.webp',
      "preview":true
    },
    {
      "spotId":1,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684031054/Airbnb-images/b7100778-f6f2-4ede-8a7c-2764454d08f3_sfc8hd.webp',
      "preview":true
    },
    {
      "spotId":1,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684031010/Airbnb-images/8c792c85-c314-4246-84dd-9ba1fc9b89ad_omwwuq.webp',
      "preview":true
    },
    
    { 
      "spotId":2,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684031867/Airbnb-images/8ea772af-a602-447d-b7a0-72f6d515486f_zgskko.webp',
      "preview":true
    },
    { 
      "spotId":2,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684031896/Airbnb-images/de6e9ed0-52ee-4055-9749-c76cdd7306d0_xltpgm.webp',
      "preview":true
    },
    { 
      "spotId":2,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684031915/Airbnb-images/c9fc4c8a-fa05-4f57-96f4-dc576f9566ee_g4ym3k.webp',
      "preview":true
    },
    { 
      "spotId":2,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684031986/Airbnb-images/36ef5d0f-4c73-40e3-be5c-f7c1cd3c43d9_lmi7b7.webp',
      "preview":true
    },
    { 
      "spotId":2,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032009/Airbnb-images/a61a3bea-9afa-4c23-b13f-352148d0a104_zpoib9.webp',
      "preview":true
    },

    {  
      "spotId":3,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032083/Airbnb-images/22a44260-a737-4fc3-bc50-a9ee3163d0ba_qheato.webp',
      "preview":true
    },
    {  
      "spotId":3,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032108/Airbnb-images/dca4e2d1-b089-476b-8f48-f18a0e718132_zukdu3.webp',
      "preview":true
    },
    {  
      "spotId":3,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032129/Airbnb-images/7b843668-d1a9-42a4-a14c-a17ee6280852_jgprui.webp',
      "preview":true
    },
    {  
      "spotId":3,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032141/Airbnb-images/f32f2505-0e4b-4a49-ad51-d1ba56278dd7_memrp0.webp',
      "preview":true
    },
    {  
      "spotId":3,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032226/Airbnb-images/94f9ecc5-8659-466d-ab5c-2377fb55aaa3_ep8zf8.webp',
      "preview":true
    },

    {  
      "spotId":4,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032317/Airbnb-images/ee94e6c1-6ebc-496e-af84-1502edd1b759_lsn4hk.webp',
      "preview":true
    },
    {  
      "spotId":4,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032343/Airbnb-images/35989289-d57f-449a-b23b-0c285e715ee1_pxmb16.webp',
      "preview":true
    },
    {  
      "spotId":4,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032351/Airbnb-images/3c301810-1ebb-48a8-a21f-43529a819b2d_jmxcrj.webp',
      "preview":true
    },
    {  
      "spotId":4,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032361/Airbnb-images/9784bae5-41f7-49f7-9cb7-2182e96283c9_if1wos.webp',
      "preview":true
    },
    {  
      "spotId":4,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032374/Airbnb-images/f5216da8-4574-4edd-b5f4-e2db5bf273d7_kxvmfc.webp',
      "preview":true
    },
    {  
      "spotId":5,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032509/Airbnb-images/38def551-c7d8-4731-8d86-ff57f7f10bc2_qmwy4o.webp',
      "preview":true
    },
    {  
      "spotId":5,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032535/Airbnb-images/d2eed6a5-73aa-4b01-a2e0-1a27f0eb39c6_gf35xv.webp',
      "preview":true
    },
    {  
      "spotId":5,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032527/Airbnb-images/cbda2175-afd6-4ab4-9df7-0122b1e95152_v9fxcc.webp',
      "preview":true
    },
    {  
      "spotId":5,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032557/Airbnb-images/b00fc02d-40fb-4930-a39e-9fa266fb57d0_zoqbj1.webp',
      "preview":true
    },
    {  
      "spotId":5,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032564/Airbnb-images/a3cfa98c-010e-475b-820c-0931108c9184_pv82fn.webp',
      "preview":true
    },
    {  
      "spotId":6,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032660/Airbnb-images/b3d64556-02f2-4839-8be0-98460bdadbe3_b4m8wo.webp',
      "preview":true
    },
    {  
      "spotId":7,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032830/Airbnb-images/651803b1-d407-4f3e-ac1c-4d36a0f4659f_uchajx.webp',
      "preview":true
    },
    {  
      "spotId":8,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684032980/Airbnb-images/4c792a4c-2b78-46be-9f01-cba07e4e0be1_ur3v2v.webp',
      "preview":true
    },
    {  
      "spotId":9,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684092780/Airbnb-images/e7da1f36-922f-4631-a287-91ceda05970f_jyscfd.webp',
      "preview":true
    },
    {  
      "spotId":10,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684092929/Airbnb-images/0620e8a0-0b5a-4991-b5e2-5277b8cc6a13_qrgutx.webp',
      "preview":true
    },
    {  
      "spotId":11,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684093100/Airbnb-images/2c2cf7d3-cfa7-46f6-b9d7-cfd88fef90eb_ahs5ee.webp',
      "preview":true
    },
    {  
      "spotId":12,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684093305/Airbnb-images/1dfe0b24-e1a8-4c24-bb80-3eec649237be_b1z5um.webp',
      "preview":true
    },
    {  
      "spotId":13,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684093862/Airbnb-images/6ceba4f8-4e7a-4d68-9928-082e9ac67c79_wamcwn.webp',
      "preview":true
    },
    {  
      "spotId":14,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684094095/Airbnb-images/2903e59d-01f8-4c0d-9d19-e119f0c2d603_pdoyyq.webp',
      "preview":true
    },
    {  
      "spotId":15,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684094592/Airbnb-images/0da70267-d9da-4efb-9123-2714b651c9fd_hnos0a.webp',
      "preview":true
    },
    {  
      "spotId":16,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684094750/Airbnb-images/b8a5f60d-2bda-4050-bc9e-55af012d6eb4_nqtqtf.webp',
      "preview":true
    },
    {  
      "spotId":17,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684093862/Airbnb-images/6ceba4f8-4e7a-4d68-9928-082e9ac67c79_wamcwn.webp',
      "preview":true
    },
    {  
      "spotId":18,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684094095/Airbnb-images/2903e59d-01f8-4c0d-9d19-e119f0c2d603_pdoyyq.webp',
      "preview":true
    },
    {  
      "spotId":19,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684094592/Airbnb-images/0da70267-d9da-4efb-9123-2714b651c9fd_hnos0a.webp',
      "preview":true
    },
    {  
      "spotId":20,
      "url":'https://res.cloudinary.com/dxrhf8ah9/image/upload/v1684094750/Airbnb-images/b8a5f60d-2bda-4050-bc9e-55af012d6eb4_nqtqtf.webp',
      "preview":true
    },
    




   ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName='SpotImages';
    await queryInterface.bulkDelete(options)
  }
};
