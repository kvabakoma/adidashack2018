const stickerList = require('../storage/stickerList.json')

module.exports = {
  getAll(){
    res.send(stickerList)

  },
  getById(id){

   let sticker= stickerList.stickers.filter((sticker)=>{
     return sticker.stickerId===id
     }
   )

    res.status(200)
    res.send(sticker[0]);
  }
}
