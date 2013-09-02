<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<!--METADATA TYPE= "typelib"  NAME= "ADODB Type Library" FILE="C:\Program Files\Common Files\SYSTEM\ADO\msado15.dll" -->
<%
	Dim Conn, Comm, Rs, errCode, errMsg, jsonText
	Dim cust_cd, trd_dt,unit,fund_cd
	
	cust_cd = request.querystring("cust_cd")
	trd_dt = request.querystring("trd_dt")
	unit = request.querystring("unit")
	fund_cd = request.querystring("fund_cd")

	Set Conn = Server.CreateObject("ADODB.Connection")
	set Comm = Server.CreateObject("ADODB.Command")
	set Rs = Server.CreateObject("ADODB.Recordset")

	Comm.Parameters.Append Comm.CreateParameter("IN_CUST_CD", adVarChar, adParamInput,	10, cust_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_TRD_DT", adVarChar, adParamInput, 8, trd_dt)
	Comm.Parameters.Append Comm.CreateParameter("IN_UNIT", adVarChar, adParamInput, 10, unit)
	Comm.Parameters.Append Comm.CreateParameter("IN_FUND_CD", adVarChar, adParamInput, 10, fund_cd)
	Comm.Parameters.Append Comm.CreateParameter("O_STATUS", adInteger, adParamOutput, 50)
	Comm.Parameters.Append Comm.CreateParameter("O_ERRMSG", adVarChar, adParamOutput, 1000)
	Comm.CommandType = adCmdStoredProc
	Comm.CommandText = "UPKG_FAMS_PORTFOLIO_SE.USP_fcond_child"
	Conn.ConnectionString = gvConnFF
	Conn.Open
	Comm.ActiveConnection = Conn
	Set Rs = Comm.Execute
	errCode = Comm.Parameters("O_status").value
	errMsg = Comm.Parameters("O_errmsg").value
	jsonText = SpToJSON(Rs).Flush
	
	'Response.Write(cust_cd)
	'Response.Write(trd_dt)
	Response.Write(jsonText)
	Set Rs = Nothing
	Set Comm = Nothing
	Conn.Close
	Set Conn = Nothing

%>