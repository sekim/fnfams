<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<!--METADATA TYPE= "typelib"  NAME= "ADODB Type Library" FILE="C:\Program Files\Common Files\SYSTEM\ADO\msado15.dll" -->
<%
	Dim Conn, Comm, Rs, errCode, errMsg, jsonText
	Dim id
	
	id = request.querystring("id")

	Set Conn = Server.CreateObject("ADODB.Connection")
	set Comm = Server.CreateObject("ADODB.Command")
	set Rs = Server.CreateObject("ADODB.Recordset")

	Comm.Parameters.Append Comm.CreateParameter("I_ID", adVarChar, adParamInput,	10, id)
	Comm.Parameters.Append Comm.CreateParameter("O_STATUS", adInteger, adParamOutput, 50)
	Comm.Parameters.Append Comm.CreateParameter("O_ERRMSG", adVarChar, adParamOutput, 1000)
	Comm.CommandType = adCmdStoredProc
	Comm.CommandText = "UPKG_FAMS_INTRO.USER_INFO"
	Conn.ConnectionString = gvConnReal
	Conn.Open
	Comm.ActiveConnection = Conn
	Set Rs = Comm.Execute
	errCode = Comm.Parameters("O_status").value
	errMsg = Comm.Parameters("O_errmsg").value
	jsonText = SpToJSON(Rs).Flush
	
	Response.Write(jsonText)
	Set Rs = Nothing
	Set Comm = Nothing
	Conn.Close
	Set Conn = Nothing

%>