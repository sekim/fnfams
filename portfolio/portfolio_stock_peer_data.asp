<%	@LANGUAGE ="VBSCRIPT" CODEPAGE="65001" %>
<%	Response.CharSet = "UTF-8" %>
<!--#Include Virtual="/fng/common_inc.asp"-->
<!--METADATA TYPE= "typelib"  NAME= "ADODB Type Library" FILE="C:\Program Files\Common Files\SYSTEM\ADO\msado15.dll" -->
<%
	Dim Conn, Comm, Rs, errCode, errMsg, jsonText
	Dim cust_cd, fund_cd, trd_dt, mkt_gb, unit
	
	Err.Clear
	On Error Resume Next
	
	cust_cd = request.querystring("cust_cd")
	fund_cd = request.querystring("fund_cd")
	trd_dt = request.querystring("trd_dt")
	mkt_gb = request.querystring("mkt_gb")
	unit = request.querystring("unit")

	Set Conn = Server.CreateObject("ADODB.Connection")
	set Comm = Server.CreateObject("ADODB.Command")
	set Rs = Server.CreateObject("ADODB.Recordset")

	Comm.Parameters.Append Comm.CreateParameter("IN_CUST_CD", adVarChar, adParamInput,	10, cust_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_FUND_CD", adVarChar, adParamInput,	10, fund_cd)
	Comm.Parameters.Append Comm.CreateParameter("IN_TRD_DT", adVarChar, adParamInput, 8, trd_dt)
	Comm.Parameters.Append Comm.CreateParameter("IN_MKT_GB", adVarChar, adParamInput, 10, mkt_gb)
	Comm.Parameters.Append Comm.CreateParameter("IN_UNIT", adVarChar, adParamInput, 10, unit)
	Comm.Parameters.Append Comm.CreateParameter("OUT_ERR_NUM", adInteger, adParamOutput, 50)
	Comm.Parameters.Append Comm.CreateParameter("OUT_ERR_MSG", adVarChar, adParamOutput, 1000)
	Comm.CommandType = adCmdStoredProc
	Comm.CommandText = "UPKG_FAMS_PORTFOLIO.USP_STOCK_PEER"
	Conn.ConnectionString = gvConnFF
	Conn.Open
	Comm.ActiveConnection = Conn

	Set Rs = Comm.Execute
	errCode = Comm.Parameters("OUT_ERR_NUM").value
	errMsg = Comm.Parameters("OUT_ERR_MSG").value

	If Err.Number <> 0 Then
		response.write "cust_cd:" & cust_cd & "<br>"
		response.write "fund_cd:" & fund_cd & "<br>"
		response.write "trd_dt:" & trd_dt & "<br>"
		response.write "mkt_gb:" & mkt_gb & "<br>"
		response.write "unit:" & unit & "<br>"
		Response.Write (Err.Description& "<br><br>")
		Response.write errCode & "<br>"
		Response.Write errMsg & "<br>"
		Response.End
	End If
	On Error GoTo 0

	jsonText = SpToJSON(Rs).Flush

	Response.Write(jsonText)
	Set Rs = Nothing
	Set Comm = Nothing
	Conn.Close
	Set Conn = Nothing

%>