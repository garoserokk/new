const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {pool} = require('./db');
const multer = require('multer');
// node 내장 모듈
const path = require('path');
const { doesNotMatch } = require('assert/strict');
const PORT =8080;

const upload = multer({
    storage:multer.diskStorage({
        //파일 업로드 위치
        destination : (res,file,done)=>{
            done(null,"public/")
        },
        //파일을 어떻게 저장할 것인가
        filename:(req,file,done)=>{
            console.log(file);

            //확장자 추출
            const ext = path.extname(file.originalname)
            //확장자를 제외한 이름
            const fileNameExeptExt = path.basename(file.originalname,ext);
            //원본 파일이름 + 날짜 + 확장자
            //Date.now() 상세 년월일시초
            const saveFileName = fileNameExeptExt + Date.now() +ext;
            done(null,saveFileName)
        }
    })
})


const app =express();

//cors 셋팅
app.use(cors());
//http log
app.use(morgan('dev'));
//body 데이터 받아오기
app.use(express.json());
//전역 폴더 셋팅
app.use("/public",express.static("public"));


app.get("/api/menus", async (req,res)=>{
    try {
        const data = await pool.query("SELECT * FROM menus");
        return res.json(data[0]);
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:"전체 메뉴 목록 조회에 실패하였습니다."
        });
    }
})


//api menus에서 특정 값만을 가져오는 방법
app.get("/api/menus/:id",async(req,res)=>{
    try {
        const data = await pool.query("SELECT * FROM menus WHERE id =?",[req.params.id]);
        console.log(data[0]);
        //data[0] -> data[0][0] 배열안에 객체에 접근
        return res.json(data[0][0]);

    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:"메뉴 조회에 실패하였습니다."
        })
    }
})

//post ("라우터 주소",upload,(req,res))
app.post("/api/menus",upload.single('file'),async(req,res)=>{
    try {
        //multer에서 정상처리해서 데이터를 넘겨주는 경우
        //req.file에 담겨서 넘어온다.
        console.log(req.file);
        console.log(req.file.path);
        console.log(req.body);
        const data = await pool.query(`INSERT INTO menus (name,description,image_src)
        VALUES (?,?,?)`,[req.body.name,req.body.description,req.file.path]);

        return res.json({
            success:true,
            message:"메뉴 등록에 성공하였습니다."
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:"메뉴 등록에 실패하였습니다."
        })
    }
})
// path를 할 때는 파일 업로드 불가능 하게 하기 때문에
// 이름과 설명만 변경 가능한다.
app.patch("/api/menus/:id",async(req,res)=>{
    try {
        console.log(req.params);

        const data = await pool.query('UPDATE menus SET name =?,description =? where id =?',
        [req.body.name, req.body.description,req.params.id]);

        return res.json({
            success:true, message:"메뉴 정보 수정에 성공하였습니다."
        });
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,message:"메뉴 정보 수정에 실패하였습니다."
        });
    }
})
//수정
//id를 받아서 해당 id로 찾아서 image_src를 업데이트

app.post('/api/menus/:id/image',upload.single('file'),async(req,res)=>{
    try {
        const data = await pool.query('UPDATE menus SET image_src =? where id =?',
        [req.file.path,req.params.id]);

        return res.json({
            success:true,message:"메뉴 이미지 수정에 성공하였습니다."
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,message:"메뉴 이미지 수정에 실패하였습니다."
        });
    }
})


app.delete ("/api/menus/:id",async(req,res)=>{
    try {

        const data= await pool.query("DELETE FROM menus WHERE id=?",[req.params.id])
        return res.json({
            success:true,
            message:"메뉴 삭제에 성공하였습니다."
        })
    } catch (error) {
        console.log(error);
        return res.json({
            succes:false,
            message:"메뉴 삭제에 실패하였습니다."
        });
    }
})



//orders 파트


app.get("/api/orders",async(req,res)=>{
    try {
        //LEFT JOIN
        //INNER JOIN : => null로 된 결과물을 가져오지 않는다.
        //a.id라 하는 이유 a의 id를 지칭하는지 b의 id를 지칭하는지 모르기 때문
        // 나머지는 왜 a. 이나 b.을 붙이지 않았나?
        //겹치는 부분이 없었기 때문에
        const data = await pool.query(`
        SELECT a.id,a.quantity, a.request_detail, name, description
        FROM orders as a
        INNER JOIN menus as b
        ON a.menus_id = b.id
        ORDER BY a.id DESC
        `)
        return res.json(data[0]);
    } catch (error) {
        console.log(error);
        return res.json({
            succes:false,
            message:"전체 주문 목록 조회에 실패하였습니다."
        })
        
    }
})

app.post("/api/orders",async (req,res)=>{
    try {

        const data = await pool.query(`
        INSERT INTO orders (quantity,request_detail,menus_id)
        VALUES (?, ? ,?)`,[req.body.quantity,req.body.request_detail,req.body.menus_id])
         
        return res.json({
            success: true,
            message:"주문에 성공하였습니다."
        })
    } catch (error) {
        console.log(error);

        return res.json({
            succes:false,
            message:"주문에 실패하였습니다."
        })

    }
})

app.get("/api/orders/:id", async (req,res) => {
    try{
        const data = await pool.query(`SELECT a.id,quantity,request_detail, name, description
        FROM orders as a
        INNER JOIN menus as b
        ON a.menus_id = b.id
        WHERE a.id = ?
        ORDER BY a.id desc`,[req.params.id]);

    return res.json(data[0][0]);
}
catch(error){
    console.log(error);

    return res.json({
        success : false,
        message : "특정 주문번호 상세 조회에 실패하였습니다."
    })
}
})

//주문내역 수정기능
// id를 입력받아서 주문내역 수정
app.patch('/api/orders/:id', async (req,res) => {
    try{
        console.log(req.params);

    const data = await pool.query(`UPDATE orders SET quantity = ?, request_detail = ?, menus_id = ? WHERE id=?`,
    [req.body.quantity, req.body.request_detail, req.body.menus_id, req.params.id]);
    return res.json({
        success : true,
        message : "주문 정보 수정에 성공하였습니다."
    });
}
catch(error){
    console.log(error);
    return res.json({
        success : false,
        message : "주문 정보 수정에 실패하였습니다."
    })
}
})

app.delete('/api/orders/:id', async (req,res) => {
    try{
        console.log(req.params);

    const data = await pool.query(`DELETE FROM orders WHERE id = ?`,[req.params.id]);

    return res.json({
        success : true,
        message : "주문 취소 성공"
    })
}
catch(error){
    return res.json({
        success: false,
        message : "주문 취소 실패"
    })
}
})

app.listen(PORT,()=>console.log(`${PORT} 가동중`));