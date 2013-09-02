<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim ConnFF, strSQL, jsonText
	Dim cust_cd
	cust_cd = request.querystring("cust_cd")

	Set ConnFF = Server.CreateObject("ADODB.Connection")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "select PEER_CD, PEER_NM from AM_SGM010 where cust_cd = '" + cust_cd + "' AND PARENT_PEER_CD IS NOT NULL order by PEER_NM asc"
	jsonText = QueryToJSON(ConnFF, strSQL).Flush
	Response.Write(jsonText)
%>