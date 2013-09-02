<%@LANGUAGE="VBSCRIPT" CODEPAGE="65001"%>
<!--#Include Virtual="/fng/common_inc.asp"-->
<%
	dim body
	body = request("sbody")
	filename = request("filename")
	if filename = "" then
		filename = "fams"
	end if
	Response.Buffer = True
	Response.Clear
	Response.ContentType = "application/vnd.ms-excel; charset=utf-8" 
	Response.CacheControl = "private"
	Response.AddHeader "cache-control","private"
	Response.AddHeader "Pragma","no-cache"
	Response.AddHeader "content-disposition", "Attachment; filename=" & filename & ".xls"
%>
<html>
<head>
<meta http-equiv="Content-Type" content="application/vnd.ms-excel; charset=utf-8" />
<style type="text/css">
body, table, tr, td {
	font-family:돋움, seoul, arial, verdana;
	font-size:12px;
	line-height:120%;
}
</style>
</head>
<body>
	<%
	response.write body
	%>
</body>
</html>