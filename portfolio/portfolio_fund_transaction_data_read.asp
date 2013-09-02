<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<!--METADATA TYPE= "typelib"  NAME= "ADODB Type Library" FILE="C:\Program Files\Common Files\SYSTEM\ADO\msado15.dll" -->
<%
	Dim Conn, Comm, Rs, errCode, errMsg, jsonText
	Dim cust_cd, from_dt, to_dt, div_unit, fund_cd, type_cd, trd_gubn
	
	cust_cd = request.querystring("cust_cd")
	from_dt = request.querystring("from_dt")
	to_dt = request.querystring("to_dt")
	div_unit = request.querystring("div_unit")
	fund_cd = request.querystring("fund_cd")
	type_cd = request.querystring("type_cd")
	trd_gubn = request.querystring("trd_gubn")
	

	Set Conn = Server.CreateObject("ADODB.Connection")
	set Comm = Server.CreateObject("ADODB.Command")
	set Rs = Server.CreateObject("ADODB.Recordset")

	Comm.Parameters.Append Comm.CreateParameter("IN_CUST_CD", adVarChar, adParamInput,	10, cust_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_FUND_CD", adVarChar, adParamInput,	20, fund_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_TYPE", adVarChar, adParamInput,	20, type_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_FROM_DT", adVarChar, adParamInput, 8, from_dt)
	Comm.Parameters.Append Comm.CreateParameter("IN_TO_DT", adVarChar, adParamInput, 8, to_dt)
	Comm.Parameters.Append Comm.CreateParameter("IN_UNIT_DIV", adVarChar, adParamInput, 50, div_unit)
	Comm.Parameters.Append Comm.CreateParameter("IN_TRD_GUBN", adVarChar, adParamInput, 5, trd_gubn)
	Comm.Parameters.Append Comm.CreateParameter("OUT_ERR_NUM", adInteger, adParamOutput, 50)
	Comm.Parameters.Append Comm.CreateParameter("OUT_ERR_MSG", adVarChar, adParamOutput, 1000)
	Comm.CommandType = adCmdStoredProc
	Comm.CommandText = "UPKG_FAMS_WZD_FOR_TEST.USP_TRANSACTION_LIST_PER_TYPE"
	Conn.ConnectionString = gvConnFF
	Conn.Open
	Comm.ActiveConnection = Conn
	Set Rs = Comm.Execute
	errCode = Comm.Parameters("OUT_ERR_NUM").value
	errMsg = Comm.Parameters("OUT_ERR_MSG").value
	jsonText = SpToJSON(Rs).Flush
	
	'Response.Write(cust_cd)
	'Response.Write(trd_dt)
	Response.Write(jsonText)
	Set Rs = Nothing
	Set Comm = Nothing
	Conn.Close
	Set Conn = Nothing

%>