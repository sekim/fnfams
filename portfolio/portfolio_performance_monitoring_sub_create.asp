<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<!--METADATA TYPE= "typelib"  NAME= "ADODB Type Library" FILE="C:\Program Files\Common Files\SYSTEM\ADO\msado15.dll" -->
<%
	Dim Conn, Comm, Rs, errCode, errMsg, jsonText
	Dim cust_cd, peer_cd, chk_rt, bm_chk_rt, peer_chk_rt
	
	Dim nChkRt, nBmChkRt, nPeerChkRt
	cust_cd = request.querystring("cust_cd")
	peer_cd = request.querystring("peer_cd")
	chk_rt = request.querystring("chk_rt")
	if chk_rt = "" then
		chk_rt = "0"
	end if

	bm_chk_rt = request.querystring("bm_chk_rt")
	if bm_chk_rt = "" then
		bm_chk_rt = 0
	end if

	peer_chk_rt = request.querystring("peer_chk_rt")
	if peer_chk_rt = "" then
		peer_chk_rt = 0
	end if

	Set Conn = Server.CreateObject("ADODB.Connection")
	set Comm = Server.CreateObject("ADODB.Command")
	set Rs = Server.CreateObject("ADODB.Recordset")

	Comm.Parameters.Append Comm.CreateParameter("IN_CUST_CD", adVarChar, adParamInput,	10, cust_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_PEER_CD", adVarChar, adParamInput,	200, peer_cd)

	Comm.Parameters.Append Comm.CreateParameter("IN_CHK_RT", adVarChar, adParamInput, 100, chk_rt)
	Comm.Parameters.Append Comm.CreateParameter("IN_BM_CHK_RT", adVarChar, adParamInput, 100, bm_chk_rt)
	Comm.Parameters.Append Comm.CreateParameter("IN_PEER_CHK_RT", adVarChar, adParamInput, 100, peer_chk_rt)

	Comm.Parameters.Append Comm.CreateParameter("OUT_ERR_NUM", adInteger, adParamOutput, 50)
	Comm.Parameters.Append Comm.CreateParameter("OUT_ERR_MSG", adVarChar, adParamOutput, 1000)
	Comm.CommandType = adCmdStoredProc
	Comm.CommandText = "UPKG_FAMS_WZD_FOR_TEST.USP_MONITORING_PEER_SAVE"
	Conn.ConnectionString = gvConnFF
	Conn.Open
	Comm.ActiveConnection = Conn
	Set Rs = Comm.Execute
	errCode = Comm.Parameters("OUT_ERR_NUM").value
	errMsg = Comm.Parameters("OUT_ERR_MSG").value
	'jsonText = SpToJSON(Rs).Flush
	
	'Response.Write(cust_cd)
	'Response.Write(trd_dt)
	'Response.Write(jsonText)
	Set Rs = Nothing
	Set Comm = Nothing
	Conn.Close
	Set Conn = Nothing
%>