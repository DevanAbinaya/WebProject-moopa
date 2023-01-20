[_tb_system_call storage=system/_scene1.ks]

[cm  ]
[bg  storage="900p.png"  time="1000"  ]
[tb_show_message_window  ]
[tb_start_text mode=1 ]
# ?????
Woahh akhirnya kelar juga cok[p]
Eh, gw ke kantin duluan ya.[p]
Laper banget gw dari pagi blom sarapan.[p]

[_tb_end_text]

[chara_show  name="Ihsan"  time="500"  wait="true"  left="1017"  top="154"  width="396"  height="746"  reflect="false"  storage="chara/1/happy.png"  ]
[tb_start_text mode=1 ]
# ?????
Oi! Char! Nitip mie ayam bisa kali hehe[p]
[_tb_end_text]

[chara_mod  name="Ihsan"  time="0"  cross="false"  storage="chara/1/happy_idle.png"  ]
[chara_show  name="Devan"  time="500"  wait="true"  storage="chara/2/angry.png"  width="366"  height="746"  left="199"  top="154"  ]
[tb_start_text mode=1 ]
# Charles
Nitap nitip, enak bener lu kalo ngomong.[p]
[_tb_end_text]

[chara_mod  name="Devan"  time="0"  cross="true"  storage="chara/2/datar.png"  ]
[tb_start_text mode=1 ]
# Charles
Yaudah mana sini duit lu sama plus ongkir nya 5 ribu.[p]
[_tb_end_text]

[chara_mod  name="Devan"  time="0"  cross="true"  storage="chara/2/datar_idle.png"  ]
[chara_mod  name="Ihsan"  time="0"  cross="true"  storage="chara/1/happy.png"  ]
[tb_start_text mode=1 ]
# Kyle
Nih, goceng.[p]
Jangan lupa minum nya yak :v[p]
Canda canda, gw ikut lu ke kantin aja lah.[p]
#
[_tb_end_text]

[tb_hide_message_window  ]
[chara_hide_all  time="1000"  wait="true"  ]
[cm  ]
[tb_show_message_window  ]
[bg  time="1000"  method="crossfade"  storage="garden.png"  ]
[tb_start_text mode=1 ]
#
Saat mereka sedang berjalan menuju kantin,[p]
Mereka bertemu dengan Nathan, dan mengajaknya untuk ikut ke kantin bersama.[p]
# Kyle
Eh, ada Nathan tuh.[p]
Ajak ke kantin sekalian gak? [p]
# Charles
Gas[p]
# Kyle
Oi Nath, mau ikut ke kantin gak?[p]
# Nathan
Eh, eh ikut dong, gw juga mau beli cireng.[p]
#
[_tb_end_text]

[tb_hide_message_window  ]
[clickable  storage="scene1.ks"  x="100"  y="100"  width="100"  height="100"  target=""  ]
[cm  ]
[s  ]
