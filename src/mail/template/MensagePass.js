const linkLinkedin = 'https://www.linkedin.com/in/joão-pedro-pereira-de-souza-91a0b51b6';
const linkInstagram = 'https://www.instagram.com/jppereirass/';
const linkEmail = 'jppereiradesouza29@gmail.com'

const template = (title , submensage , tokenPass) =>{

const data = 

    `
    <html>
        <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Pokebook</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <script>
        function myFunction() {

        let text = document.getElementById("textToken").innerHTML;
        navigator.clipboard.writeText(text)
      
     
    }
    </script>
        </head>
        <body style="margin: 0; padding: 0; display:flex;justify-content:center">

    
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
        <td  bgcolor="#3D3D3D" style="padding:50px 0">
        <img src="https://fontmeme.com/permalink/210126/cab0ea83f26568630e3431a55a2af0a6.png" alt="logo" width="280" style="display: block; object-fit: contain;margin:auto"/>
        <img src="https://github.com/joaopedro29/Project-Pokemon-Mobile/blob/main/PokemonMobile/src/assets/phanpyRight.png?raw=true" alt="iconLogo" width="120" style="display: block; object-fit: contain;margin:auto"/>
        </td>
        </tr>
        <tr>
        <td style="padding: 80px 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
        <td style="color: #FACF5A; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">
        ${title}
        </td>
        </tr>
        <tr>
        <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
        
        <p> ${submensage} </p>

        <p  id="textToken" style="padding:10px; color: #ffffff; font-weight: bold; border-radius: 5px; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px; background-color:#76ADAE">
        ${tokenPass}
        </p>

        </td>
        </tr>

        </table>

        </td>
        </tr>
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" height="80">
                
                <tr bgcolor="#3D3D3D"  align-items:center">

                    <td bgcolor="#3D3D3D" >

                    <div style="margin-left:20px;"> 

                            <p style="color:#fff; font-weight:bold; font-family: Arial, sans-serif; font-size: 20px;"> Admin: </p>

                            <p style="color:#fff; font-weight:bold; font-family: Arial, sans-serif; font-size: 14px; opacity: 0.7; margin-top: -190px; ">João Pedro</p>
                            
                    </div>
                    
                    </td>

                    <td bgcolor="#3D3D3D" style="text-align:right; ">

                    <div style="margin:0 20px 0 0;"> 

                            <a href="${linkLinkedin}" cursor="pointer" style="padding:10px; color: #ffffff;text-decoration: none; font-weight: bold; border-radius: 5px; font-family: Arial, sans-serif; font-size: 10px; line-height: 20px; background-color: #76ADAE">Linkedin</a>
                            <a href="${linkInstagram}" cursor="pointer" style="padding:10px; color: #ffffff; font-weight: bold; border-radius: 5px; font-family: Arial, sans-serif; font-size: 10px;text-decoration: none; line-height: 20px; background-color: #76ADAE">instagram</a>
                            <a href="${linkEmail}" cursor="pointer" style="padding:10px; color: #ffffff; font-weight: bold; border-radius: 5px; font-family: Arial, sans-serif; font-size: 10px;text-decoration: none; line-height: 20px; background-color: #76ADAE">email</a>
                
                    </div>
                    
                    </td>
                </tr>

        </table>
        
        </table>
        </td>
        </tr>
        </table>

        </body>
        </html>
    `

return data


}

module.exports = template;