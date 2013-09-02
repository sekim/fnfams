<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<!--METADATA TYPE= "typelib"  NAME= "ADODB Type Library" FILE="C:\Program Files\Common Files\SYSTEM\ADO\msado15.dll" -->
<%
	Dim Conn, Comm, Rs, errCode, errMsg, jsonText
	Dim cust_cd, bm_cd, std_dt, fr_dt, bm_nm, mkt_idx_cd, use_yn, work_id
	
	cust_cd = request.querystring("cust_cd")
	bm_cd = request.querystring("bm_cd")
	std_dt = request.querystring("std_dt")
	fr_dt = request.querystring("fr_dt")
	bm_nm = request.querystring("bm_nm")
	mkt_idx_cd = request.querystring("mkt_idx_cd")
	use_yn = request.querystring("use_yn")
	work_id = request.querystring("work_id")

	Set Conn = Server.CreateObject("ADODB.Connection")
	set Comm = Server.CreateObject("ADODB.Command")
	set Rs = Server.CreateObject("ADODB.Recordset")

	Comm.Parameters.Append Comm.CreateParameter("IN_CUST_CD", adVarChar, adParamInput, 10, cust_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_BM_CD", adVarChar, adParamInput, 10, bm_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_STD_DT", adVarChar, adParamInput, 8, std_dt)
	Comm.Parameters.Append Comm.CreateParameter("IN_FR_DT", adVarChar, adParamInput, 8, fr_dt)
	Comm.Parameters.Append Comm.CreateParameter("IN_BM_NM", adVarChar, adParamInput, 30, bm_nm)
	Comm.Parameters.Append Comm.CreateParameter("IN_MKT_IDX_CD", adVarChar, adParamInput, 25, mkt_idx_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_USE_YN", adVarChar, adParamInput, 1, use_yn)
	Comm.Parameters.Append Comm.CreateParameter("IN_WORK_ID", adVarChar, adParamInput, 20, work_id)
	Comm.Parameters.Append Comm.CreateParameter("O_STATUS", adInteger, adParamOutput, 50)
	Comm.Parameters.Append Comm.CreateParameter("O_ERRMSG", adVarChar, adParamOutput, 1000)
	Comm.CommandType = adCmdStoredProc
	Comm.CommandText = "UPKG_FAMS_SETTING.USP_ADD_BM"
	Conn.ConnectionString = gvConnFF
	Conn.Open
	Comm.ActiveConnection = Conn
	Set Rs = Comm.Execute
	errCode = Comm.Parameters("O_status").value
	errMsg = Comm.Parameters("O_errmsg").value
	'jsonText = SpToJSON(Rs).Flush

	response.write errMsg
	Set Rs = Nothing
	Set Comm = Nothing
	Conn.Close
	Set Conn = Nothing

%>