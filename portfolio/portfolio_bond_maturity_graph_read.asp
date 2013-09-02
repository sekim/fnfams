<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<!--METADATA TYPE= "typelib"  NAME= "ADODB Type Library" FILE="C:\Program Files\Common Files\SYSTEM\ADO\msado15.dll" -->
<%
	Dim Conn, Comm, Rs, errCode, errMsg, jsonText
	Dim cust_cd, trd_dt, div_unit,fund_cd
	
	cust_cd = request.querystring("cust_cd")
	trd_dt = request.querystring("trd_dt")
	div_unit = request.querystring("div_unit")
	fund_cd = request.querystring("fund_cd")


	Set Conn = Server.CreateObject("ADODB.Connection")
	set Comm = Server.CreateObject("ADODB.Command")
	set Rs = Server.CreateObject("ADODB.Recordset")

	Comm.Parameters.Append Comm.CreateParameter("IN_CUST_CD", adVarChar, adParamInput,	10, cust_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_FUND_CD", adVarChar, adParamInput,	30, fund_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_TRD_DT", adVarChar, adParamInput, 8, trd_dt)
	Comm.Parameters.Append Comm.CreateParameter("IN_UNIT_DIV", adVarChar, adParamInput, 50, div_unit)
	Comm.Parameters.Append Comm.CreateParameter("OUT_ERR_NUM", adInteger, adParamOutput, 50)
	Comm.Parameters.Append Comm.CreateParameter("OUT_ERR_MSG", adVarChar, adParamOutput, 1000)
	Comm.CommandType = adCmdStoredProc
	Comm.CommandText = "UPKG_FAMS_WZD_FOR_TEST.USP_BOND_MATURITY_GRAPH"
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