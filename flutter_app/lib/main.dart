import 'package:flutter/material.dart';
import 'dart:html' as html;
import 'dart:ui' as ui;


void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CloudNote',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: WebInWebWidget(),
    );
  }
}



class WebInWebWidget extends StatefulWidget {
  @override
  _WebInWebState createState() => _WebInWebState();
}
class _WebInWebState extends State<WebInWebWidget> {
  late html.IFrameElement _element;
  @override
  void initState() {
  //注册
    _element = html.IFrameElement()
      ..style.border = 'none'
      ..src = 'http://localhost:8008/';
      //屏蔽报错
    // ignore:undefined_prefixed_name
    ui.platformViewRegistry.registerViewFactory(
      'webInWeb',
          (int viewId) => _element,
    );
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      //web视图
      child: HtmlElementView(viewType: 'webInWeb'),
    );
  }
}
