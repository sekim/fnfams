<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL, jsonText, custCd
	CustCd = request.querystring("cust_cd")
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "select * from AM_FBM010 where cust_cd = '" & custCd & "' and parent_gb <> '11' order by fund_cd asc, peer_cd asc"
	jsonText = QueryToJSON(ConnFF, strSQL).Flush
	'response.write(strSQL)
	Response.Write(jsonText)
%>