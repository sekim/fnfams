<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	Dim Rs, ConnFF, strSQL
	Dim cust_cd, peer_cd
	cust_cd = Request("cust_cd")
	peer_cd = Request("peer_cd")
	Set ConnFF = Server.CreateObject("ADODB.Connection")
	Set Rs = Server.CreateObject("ADODB.Recordset")
	ConnFF.ConnectionString = gvConnFF
	ConnFF.Open
	strSQL = "delete am_sgm010 where cust_cd = '" & cust_cd & "' and peer_cd in ('" & peer_cd & "')"
	response.write(strSQL)
	ConnFF.Execute strSQL
	ConnFF.Close
	Set ConnFF = Nothing
%>