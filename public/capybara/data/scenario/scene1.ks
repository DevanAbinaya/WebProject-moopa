[_tb_system_call storage=system/_scene1.ks]

[cm  ]
[playbgm  volume="100"  time="1000"  loop="true"  storage="music.ogg"  ]
[bg  storage="classroom.jpg"  time="1000"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]

Hello.[p]
This is a new game project.[p]

[_tb_end_text]

[quake  time="300"  count="3"  hmax="10"  wait="true"  ]
[chara_show  name="character1"  time="1000"  wait="true"  storage="chara/undefined/chara_chisato-02.png"  width="621"  height="1258"  left="1161"  top="132"  reflect="true"  ]
[tb_start_text mode=1 ]
Hmmm what is this?[p]
[_tb_end_text]

[glink  color="btn_18_black"  storage="Taken.ks"  size="20"  x="850"  y="366"  width="200"  height=""  text="Take&nbsp;The&nbsp;Thing"  _clickable_img=""  ]
[glink  color="btn_18_black"  storage="scene1.ks"  size="20"  text="Don't&nbsp;Take&nbsp;It"  width="200"  x="853"  y="467"  height=""  _clickable_img=""  ]
[s  ]
