<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<!--METADATA TYPE= "typelib"  NAME= "ADODB Type Library" FILE="C:\Program Files\Common Files\SYSTEM\ADO\msado15.dll" -->
<%
	Dim Conn, Comm, Rs, errCode, errMsg, jsonText
	Dim cust_cd, fund_cd, peer_cd, fr_dt
	
	cust_cd = request.querystring("cust_cd")
	fund_cd = request.querystring("fund_cd")
	peer_cd = request.querystring("peer_cd")
	fr_dt = request.querystring("fr_dt")

	Set Conn = Server.CreateObject("ADODB.Connection")
	set Comm = Server.CreateObject("ADODB.Command")
	set Rs = Server.CreateObject("ADODB.Recordset")

	Comm.Parameters.Append Comm.CreateParameter("IN_CUST_CD", adVarChar, adParamInput,	5, cust_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_FUND_CD", adVarChar, adParamInput, 60, "'" & fund_cd & "'")
	Comm.Parameters.Append Comm.CreateParameter("IN_PEER_CD", adVarChar, adParamInput, 12, peer_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_FR_DT", adVarChar, adParamInput, 8, fr_dt)
	Comm.Parameters.Append Comm.CreateParameter("O_STATUS", adInteger, adParamOutput, 50)
	Comm.Parameters.Append Comm.CreateParameter("O_ERRMSG", adVarChar, adParamOutput, 1000)
	Comm.CommandType = adCmdStoredProc
	Comm.CommandText = "UPKG_FAMS_SETTING.USP_CREATE_PEER_IN_FUND"
	Conn.ConnectionString = gvConnFF
	Conn.Open
	Comm.ActiveConnection = Conn
	Set Rs = Comm.Execute
	errCode = Comm.Parameters("O_status").value
	errMsg = Comm.Parameters("O_errmsg").value
	'jsonText = SpToJSON(Rs).Flush
	
	Response.Write("'" & cust_cd & "'")
	Response.Write("'" & fund_cd & "'")
	Response.Write("'" & peer_cd & "'")
	Response.Write("'" & fr_dt & "'")
	Response.Write("'" & errMsg & "'")
	Set Rs = Nothing
	Set Comm = Nothing
	Conn.Close
	Set Conn = Nothing

%>