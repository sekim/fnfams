<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim ConnFF, strSQL, jsonText
	Dim dateType

	dateType = request.querystring("type")

	if dateType = "" then
	 	dateType = "FD" 'Fund Daily
	end if

	Set ConnFF = Server.CreateObject("ADODB.Connection")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	if dateType = "FD" then
		strSQL = "SELECT MAX(TRD_DT) AS LATEST_DT FROM AM_FDT010 "
	end if

	jsonText = QueryToJSON(ConnFF, strSQL).Flush
	Response.Write(jsonText)
%>