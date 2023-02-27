import { Request, Response } from "express";
import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const NavigationList = (req:Request, res:Response) => {
  res.json({ 
    result: "ok"
  });   
};

const NavigationPoint = (req:Request, res:Response) => {
  const id:String = req.params.id;
  const url:String | undefined = process.env.ROBOT_API;
  let value:String = "";
  switch(id){
    case "1570170238" :
      value = "1";
      break;
    case "0632740214" :
      value = "2";
      break;
    case "3643104349" :
      value = "3";
      break;
    default :
      value = "unknow";
      break;
  }
  if(value === "unknow"){
    res.json({ result: false }); 
  }else{
    axios.post(`${url}/cmd/nav_point`,{ point: value })
    .then((response) => {
      res.json({ result: true });
    }).catch((error) => {
      res.json({ result: false });
    }); 
  } 
};

const NavigationToCharge = (req:Request, res:Response) => {
  const url:String | undefined = process.env.ROBOT_API;
  axios.post(`${url}/cmd/charge`,{ type: 1, point: "charging_pile" })
    .then((response) => {
      res.json({ result: true });
    }).catch((error) => {
      res.json({ result: false });
    });  
};

export {
  NavigationList,
  NavigationPoint,
  NavigationToCharge
};