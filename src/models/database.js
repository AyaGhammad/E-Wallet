const database={

    users:[
      {id:"1",
       name:"Ali", 
       email:"Ali@example.com",
       password:"1232",
       wallet:{
        currency:"MAD",
        cards:[
            {numcards:"123454", type:"visa",balance:14712,expiry:"14-08-27",vcc:"147"},
            {numcards:"123455", type:"mastercard",balance:1470,expiry:"14-08-28",vcc:"257"},
        ],
        transactions:[
             {id:"1", type:"credit",amount:140,date:"14-08-25", from:"Ahmed" , to:"Ali"},
               {id:"2", type:"debit",amount:200,date:"13-08-25", from:"Ali" , to:"Amazon"},
              {id:"3", type:"credit",amount:250,date:"12-08-25", from:"Ahmed" , to:"Ali"},
               {id:"4", type:"debit",amount:100,date:"14-08-25", from:"Ali" , to:"Ahmed"},
        
        ]
       }
      },

       
      
      
    ]
}

const finduserbymail=(mail,password)=>{
    return database.users.find((u)=> u.email===mail && u.password===password
    );
}


export default finduserbymail;