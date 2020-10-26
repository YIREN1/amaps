package com.tridiumap.amaps.ux;

import javax.baja.naming.BOrd;
import javax.baja.nre.annotations.NiagaraType;
import javax.baja.sys.Sys;
import javax.baja.sys.Type;
import javax.baja.web.js.BJsBuild;

/**
 * JavaScript Build for the Widget.
 */
@NiagaraType
public final class BAmapsWidgetBuild extends BJsBuild
{
  @SuppressWarnings("unused")
  public static final BAmapsWidgetBuild INSTANCE = new BAmapsWidgetBuild(
    "amaps",
    new BOrd[]{BOrd.make("module://amaps/rc/amaps.built.min.js")}
    // If a new Type[] is needed here, enable the 3-argument constructor
  );

  /*+ ------------ BEGIN BAJA AUTO GENERATED CODE ------------ +*/
  /*@ $com.tridiumap.amaps.ux.BAmapsWidgetBuild(2979906276)1.0$ @*/
  /* Generated Thu Jun 27 13:47:00 CST 2019 by Slot-o-Matic (c) Tridium, Inc. 2012 */

////////////////////////////////////////////////////////////////
// Type
////////////////////////////////////////////////////////////////

  @Override
  public Type getType() { return TYPE; }

  public static final Type TYPE = Sys.loadType(BAmapsWidgetBuild.class);

  /*+ ------------ END BAJA AUTO GENERATED CODE -------------- +*/

  private BAmapsWidgetBuild(String id, BOrd[] files) {
    super(id, files);
  }
}
